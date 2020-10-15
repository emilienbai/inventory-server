import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IAuthController } from '../interfaces';
import { User } from '../models/User';

@injectable()
export class AuthenticationController implements IAuthController {
    public constructor() {}

    public async signup(req: Request, res: Response): Promise<Response> {
        try {
            await User.findOne({
                where: {
                    username: req.body.username
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(403).send();
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({
            success: true,
            status: 'You are successfully registered!'
        });
    }

    public async login(req: Request, res: Response): Promise<Response> {
        try {
            await User.findOne({
                where: {
                    username: req.body.username
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(403).send();
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        return res.json({
            success: true,
            status: 'You are successfully logged in!'
        });
    }

    public async logout(req: Request & { session: any }, res: Response): Promise<Response> {
        if (req.session) {
            req.logout();
            return req.session.destroy((err: any) => {
                if (err) {
                    return res.status(500).send();
                } else {
                    res.clearCookie('session-id');
                    return res.json({
                        message: 'You are successfully logged out!'
                    });
                }
            });
        }
        return res.status(403).send('You are not logged in!');
    }

    public async isLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (req.isAuthenticated()) {
            req.loggedInUser = (await User.findOne({
                where: {
                    username: (req.user as any).username
                }
            })) as User;
            return next();
        }
        res.status(403).send('Not logged in');
    }
}
