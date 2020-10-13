import express from 'express';
import { inject, injectable } from 'inversify';
import { IAuthorController, IRouter } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class AuthorRouter implements IRouter {
    private readonly router: express.Router;

    public constructor(@inject(TYPES.IAuthorController) private readonly authorController: IAuthorController) {
        this.router = express.Router();
        this.router.post('', this.authorController.create.bind(this.authorController));
        this.router.get('', this.authorController.list.bind(this.authorController));
        this.router.get('/:authorId', this.authorController.get.bind(this.authorController));
    }

    public getRoutes(): express.Router {
        return this.router;
    }
}
