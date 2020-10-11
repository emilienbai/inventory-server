import { Sequelize } from 'sequelize';
import { DbInterface } from '../@types/DbInterface';
import { AuthorFactory } from './Author';
import { ItemFactory } from './Item';
import { UserFactory } from './User';

export const createModels = (): DbInterface => {
    const sequelizeConfig = require('../config/sequelize/sequelizeConfig.json');
    const { database, username, password, params } = sequelizeConfig;
    const sequelize = new Sequelize(database, username, password, params);

    const db: DbInterface = {
        sequelize,
        Sequelize,
        Author: AuthorFactory(sequelize),
        Item: ItemFactory(sequelize),
        User: UserFactory(sequelize)
    };

    // Object.keys(db).forEach((modelName) => {
    //     if (db[modelName].associate) {
    //         db[modelName].associate(db);
    //     }
    // });

    return db;
};
