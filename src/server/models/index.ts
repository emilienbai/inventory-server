import { Sequelize } from 'sequelize';
import { DbInterface } from '../@types/DbInterface';
import { SequelizeConfig } from '../config/sequelize/sequelizeConfig';
import { AuthorFactory } from './Author';
import { ItemFactory } from './Item';
import { UserFactory } from './User';

export const createModels = (): DbInterface => {
    const config = new SequelizeConfig();
    const { database, username, password, params } = config;
    const sequelize = new Sequelize(database, username, password, params);

    const db: DbInterface = {
        sequelize,
        Sequelize,
        Author: AuthorFactory(sequelize),
        Item: ItemFactory(sequelize),
        User: UserFactory(sequelize)
    };

    Object.keys(db).forEach((modelName: string) => {
        // @ts-ignore
        const model = db[modelName] as any;
        if (model.associate) {
            model.associate();
        }
    });

    return db;
};
