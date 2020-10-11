import { Sequelize, Model } from 'sequelize';
import { Author, AuthorAttributes } from '../../models/Author';
import { Item, ItemAttributes } from '../../models/Item';
import { User, UserAttributes } from '../../models/User';

export interface DbInterface {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    Author: Model<Author, AuthorAttributes>;
    Item: Model<Item, ItemAttributes>;
    User: Model<User, UserAttributes>;
}
