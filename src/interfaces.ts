import { NextFunction, Request, Response } from "express";

/* controllers */
interface ICRUDController {
  create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response>;

  get(req: Request, res: Response, next?: NextFunction): Promise<Response>;

  list(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response>;

  update(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response>;

  delete(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Promise<Response>;
}

export type IAuthorController = ICRUDController

export type IItemController = ICRUDController

export interface IAuthController {
  login(req: Request, res: Response): Promise<Response>;

  logout(req: Request, res: Response): Promise<Response>;

  isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void>;
}
