import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { DbInterface } from '../@types/DbInterface';
import { SequelizeAttributes } from '../@types/SequelizeAttributes';

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
}

export const AuthorFactory = (sequelize: Sequelize): Model<Author, AuthorAttributes> => {
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

    const author = Author.init(attributes, { tableName: 'authors', sequelize });

    // @ts-ignore
    author.associate = (models: DbInterface) => {
        // @ts-ignore
        Author.belongsTo(models.User, { foreignKey: 'creatorId', as: 'creator' });
    };

    return author;
};
