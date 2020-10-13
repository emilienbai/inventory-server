import bCrypt from 'bcrypt-nodejs';
import { Request } from 'express';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { User } from '../../models/User';

export function initializePassport(passport: passport.PassportStatic, auth: typeof User): void {
    let Auth = auth;

    let LocalStrategy = require('passport-local').Strategy;

    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                passReqToCallback: true
            },
            async function (
                req: Request,
                username: string,
                password: string,
                done: (error: Error | null, user?: User | boolean, options?: IVerifyOptions) => void
            ) {
                console.log('Signup for - ', username);
                // let generateHash = function (password) {
                //     return bCrypt.hashSync(password, , null);
                // };
                const user = await Auth.scope('login').findOne({
                    where: {
                        username: username
                    }
                });

                if (user) {
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                } else {
                    const salt = bCrypt.genSaltSync(8);
                    const hash = bCrypt.hashSync(password, salt);
                    let data = {
                        username,
                        salt,
                        hash
                    };
                    const newUser = await Auth.create(data);

                    if (!newUser) {
                        return done(null, false);
                    }
                    if (newUser) {
                        return done(null, newUser);
                    }
                }
            }
        )
    );

    //LOCAL SIGNIN
    passport.use(
        'local-signin',
        new LocalStrategy(
            {
                passReqToCallback: true // allows us to pass back the entire request to the callback
            },
            async function (
                req: Request,
                username: string,
                password: string,
                done: (error: Error | null, user?: User | boolean, options?: IVerifyOptions) => void
            ) {
                const isValidPasswordForUser = (password: string, user: User): boolean => {
                    return user.hash === bCrypt.hashSync(password, user.salt);
                };
                try {
                    const user = await Auth.scope('login').findOne({
                        where: { username }
                    });
                    if (!user) {
                        return done(null, false, {
                            message: 'username does not exist'
                        });
                    }

                    if (!isValidPasswordForUser(password, user)) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }

                    return done(null, user);
                } catch (error: any) {
                    console.log('Error:', error);

                    return done(null, false, {
                        message: 'Something went wrong with your Signin'
                    });
                }
            }
        )
    );

    //serialize
    passport.serializeUser(function (user: User, done: (error: Error[] | null, id: number) => void) {
        done(null, user.id);
    });

    // deserialize user
    passport.deserializeUser(async function (id: number, done: any) {
        const user: any = await Auth.findByPk(id);
        if (user) {
            done(null, user);
        } else {
            done(user.errors, null);
        }
    });
}
