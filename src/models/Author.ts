import { DataTypes, HasManyGetAssociationsMixin, Model, Optional, Sequelize } from 'sequelize';
import { AssociableModel } from '../@types/DbInterface';
import { SequelizeAttributes } from '../@types/SequelizeAttributes';
import { Item } from './Item';
import { User } from './User';

export interface AuthorAttributes {
    id?: number;
    name: string;
    creatorId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

type AuthorCreationAttributes = Optional<AuthorAttributes, 'id'>;

export class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
    public id!: number;
    public name!: string;
    public creatorId!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getItems!: HasManyGetAssociationsMixin<Item>;

    public readonly creator?: User | null;
    public readonly items?: Item[] | null;
}

export const AuthorFactory = (sequelize: Sequelize): AssociableModel<Author, AuthorAttributes> => {
    const attributes: SequelizeAttributes<AuthorAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT
        },
        creatorId: {
            type: DataTypes.INTEGER
        }
    };

    const author = Author.init(attributes, {
        tableName: 'authors',
        sequelize
    }) as AssociableModel<Author, AuthorAttributes>;

    author.associate = () => {
        Author.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
        Author.hasMany(Item, { sourceKey: 'id', foreignKey: 'authorId', as: 'items' });
    };

    return author;
};
