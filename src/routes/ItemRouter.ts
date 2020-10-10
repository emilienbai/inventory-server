import express from 'express';
import { inject, injectable } from 'inversify';
import { IItemController, IRouter } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class ItemRouter implements IRouter {
    private router: express.Router;

    constructor(
        @inject(TYPES.IItemController)
        private readonly itemController: IItemController
    ) {
        this.router = express.Router();
        this.router.post('/', itemController.create.bind(itemController));
        this.router.get('/:itemId', itemController.get.bind(itemController));
    }

    getRoutes(): express.Router {
        return this.router;
    }
}