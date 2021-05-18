import { Buffer } from 'buffer';
import e, { NextFunction, Request, Response } from 'express';
import { FindOptions, Model, WhereOptions } from 'sequelize';
import { CloudinaryUploadResult } from './config/cloudinary/cloudinaryConfig';
import { File } from './models/File';

/* controllers */
interface ICRUDController {
    create(req: Request, res: Response, next?: NextFunction): Promise<Response>;

    get(req: Request, res: Response, next?: NextFunction): Promise<Response>;

    list(req: Request, res: Response, next?: NextFunction): Promise<Response>;

    update(req: Request, res: Response, next?: NextFunction): Promise<Response>;

    delete(req: Request, res: Response, next?: NextFunction): Promise<Response>;
}

export type IAuthorController = Pick<ICRUDController, 'create' | 'get' | 'list' | 'update'>;

export type IItemController = Pick<ICRUDController, 'create' | 'get' | 'list' | 'update'> & {
    updateThumbnail(req: Request, res: Response, next?: NextFunction): Promise<Response>;
};

export interface IAuthController {
    signup(req: Request, res: Response): Promise<Response>;

    login(req: Request, res: Response): Promise<Response>;

    logout(req: Request, res: Response): Promise<Response>;

    isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void>;
}

/* Routers */
export interface IRouter {
    getRoutes(): e.Router;
}

/* Service */
export interface IUtilities {
    parseQueryParameters<T extends Model>(query: any, model: any): FindOptions<T>;

    parseFilterOptions<T extends Model>(query: any, model: any): WhereOptions<T>;
}

export interface IFileUploadService {
    uploadFromBuffer(fileName: string, buffer: Buffer): Promise<File>;
}
