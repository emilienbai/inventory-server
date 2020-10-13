import express from 'express';
import { inject, injectable } from 'inversify';
import { IItemController, IRouter } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class ItemRouter implements IRouter {
    private readonly router: express.Router;

    public constructor(
        @inject(TYPES.IItemController)
        private readonly itemController: IItemController
    ) {
        this.router = express.Router();
        this.router.post('', this.itemController.create.bind(this.itemController));
        this.router.get('/:itemId', this.itemController.get.bind(this.itemController));
    }

    public getRoutes(): express.Router {
        return this.router;
    }
}
