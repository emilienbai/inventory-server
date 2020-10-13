import express from 'express';
import { inject, injectable } from 'inversify';
import passport from 'passport';
import { IAuthController, IRouter } from '../interfaces';
import { TYPES } from '../types';

@injectable()
export class IndexRouter implements IRouter {
    private readonly router: express.Router;

    public constructor(
        @inject(TYPES.IAuthController)
        private readonly authController: IAuthController,
        @inject(TYPES.IItemRouter) private readonly itemRouter: IRouter,
        @inject(TYPES.IAuthorRouter) private readonly authorRouter: IRouter
    ) {
        this.router = express.Router();

        this.router.post(
            '/signup',
            passport.authenticate('local-signup'),
            this.authController.signup.bind(this.authController)
        );
        this.router.post(
            '/login',
            passport.authenticate('local-signin'),
            this.authController.login.bind(this.authController)
        );
        this.router.get('/logout', this.authController.logout.bind(this.authController));

        this.router.use('/items', authController.isLoggedIn, this.itemRouter.getRoutes());
        this.router.use('/authors', authController.isLoggedIn, this.authorRouter.getRoutes());
    }

    public getRoutes(): express.Router {
        return this.router;
    }
}
