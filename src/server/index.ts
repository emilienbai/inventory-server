import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import path from 'path';

import { initializePassport } from './config/passport/passport';
import { IRouter } from './interfaces';
import { myContainer } from './inversify.config';
import { createModels } from './models';
import { User } from './models/User';
import { TYPES } from './types';

dotenv.config();
declare const process: NodeJS.Process;

const session = require('express-session');

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
initializePassport(passport, User);

// parse application/json
app.use(bodyParser.json());

const pathToPublic = path.join(__dirname, '../../build/public');
app.use(express.static(pathToPublic));
app.get('/', (req, res) => res.sendFile(path.join(pathToPublic, 'index.html')));

const indexRouter = myContainer.get<IRouter>(TYPES.IIndexRouter);
app.use('/api', indexRouter.getRoutes());

const port = process.env.port ? parseInt(process.env.PORT as string) : 5000;
const db = createModels();
(async () => {
    await db.sequelize.sync();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
})();
