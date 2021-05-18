import { Sequelize } from 'sequelize';
import { DbInterface } from '../@types/DbInterface';
import { SequelizeConfig } from '../config/sequelize/sequelizeConfig';
import { AuthorFactory } from './Author';
import { FileFactory } from './File';
import { ItemFactory } from './Item';
import { UserFactory } from './User';
// todo package in an injectable sequelizeManager
export const createModels = (): DbInterface => {
    const config = new SequelizeConfig();
    const { url, params } = config;
    const sequelize = new Sequelize(url, params);

    const db: DbInterface = {
        sequelize,
        Sequelize,
        Author: AuthorFactory(sequelize),
        Item: ItemFactory(sequelize),
        User: UserFactory(sequelize),
        File: FileFactory(sequelize)
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
