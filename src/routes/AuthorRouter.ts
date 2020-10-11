import express from 'express';
import { inject, injectable } from 'inversify';
import { IAuthorController, IRouter } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class AuthorRouter implements IRouter {
    private readonly router: express.Router;

    public constructor(@inject(TYPES.IAuthorController) private readonly authorController: IAuthorController) {
        this.router = express.Router();
        this.router.post('/', authorController.create);
    }

    public getRoutes(): express.Router {
        return this.router;
    }
}
