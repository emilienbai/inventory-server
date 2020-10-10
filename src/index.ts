import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import { IRouter } from './interfaces';
import { myContainer } from './inversify.config';
import { connectDb } from './models';
import { createUserIfNoUsers } from './models/seeds/userSeed';
import User from './models/user';
import { TYPES } from './types';

dotenv.config();
declare const process: NodeJS.Process;

const session = require('express-session');

const LocalStrategy = passportLocal.Strategy;

const app = express();

app.use(
    session({
        name: 'session-id',
        secret: process.env.SECRET || 'crazyComplicatedSecret',
        saveUninitialized: false,
        resave: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// parse application/json
app.use(bodyParser.json());

const indexRouter = myContainer.get<IRouter>(TYPES.IIndexRouter);
app.use('/api', indexRouter.getRoutes());

const port = process.env.port ? parseInt(process.env.PORT as string) : 5000;
connectDb().then(async () => {
    await createUserIfNoUsers();

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
