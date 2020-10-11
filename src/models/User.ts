import { VerifyFunction } from 'passport-local';
import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SequelizeAttributes } from '../@types/SequelizeAttributes';

export interface UserAttributes {
    id?: number;
    username: string;
    salt: string;
    hash: string;
    createdAt?: Date;
    updatedAt?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;

    public hash!: string;
    public salt!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const UserFactory = (sequelize: Sequelize): Model<User, UserAttributes> => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.TEXT
        },
        hash: {
            type: DataTypes.TEXT
        },
        salt: {
            type: DataTypes.TEXT
        }
    };
    return User.init(attributes, { tableName: 'users', sequelize });
};
