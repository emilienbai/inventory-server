import express from 'express';
import { inject, injectable } from 'inversify';
import passport from 'passport';
import { IAuthController, IRouter } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class IndexRouter implements IRouter {
    private readonly router: express.Router;

    constructor(
        @inject(TYPES.IAuthController)
        private readonly authController: IAuthController,
        @inject(TYPES.IItemRouter) private readonly itemRouter: IRouter,
        @inject(TYPES.IAuthorRouter) private readonly authorRouter: IRouter
    ) {
        this.router = express.Router();

        this.router.post('/login', passport.authenticate('local'), this.authController.login);
        this.router.get('/logout', this.authController.logout);

        this.router.use('/items', authController.isLoggedIn, this.itemRouter.getRoutes());
        this.router.use('/authors', authController.isLoggedIn, this.authorRouter.getRoutes());
    }

    getRoutes(): express.Router {
        return this.router;
    }
}
