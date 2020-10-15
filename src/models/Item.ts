import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { AssociableModel } from '../@types/DbInterface';
import { SequelizeAttributes } from '../@types/SequelizeAttributes';
import { Author } from './Author';
import { User } from './User';

export interface ItemAttributes {
    id?: number;
    name: string;
    type: 'book' | 'cd' | 'dvd';
    year?: number | null;
    barcode?: string | null;
    authorId: number;
    creatorId: number;

    createdAt?: Date;
    updatedAt?: Date;
}

type ItemCreationAttributes = Optional<ItemAttributes, 'id'>;

export class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
    public id!: number;
    public name!: string;
    public type!: 'book' | 'cd' | 'dvd';
    public year?: number | null;
    public barcode?: string | null;

    public authorId!: number;
    public creatorId!: number;

    // timestamps!
    public createdAt?: Date;
    public readonly updatedAt?: Date;

    public readonly creator?: User | null;
    public readonly author?: Author | null;
}

export const ItemFactory = (sequelize: Sequelize): AssociableModel<Item, ItemAttributes> => {
    const attributes: SequelizeAttributes<ItemAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            unique: { name: 'UniqueItemByCreatorAndType', msg: 'An item with this name and type already exists' }
        },
        type: {
            type: DataTypes.ENUM('book', 'cd', 'dvd'),
            unique: 'UniqueItemByCreatorAndType'
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        barcode: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        authorId: {
            type: DataTypes.INTEGER
        },
        creatorId: {
            type: DataTypes.INTEGER,
            unique: 'UniqueItemByCreatorAndType'
        }
    };

    const item = Item.init(attributes, { tableName: 'items', sequelize }) as AssociableModel<Item, ItemAttributes>;

    item.associate = () => {
        Item.belongsTo(User, { foreignKey: 'creatorId', as: 'creator', onDelete: 'CASCADE' });
        Item.belongsTo(Author, { foreignKey: 'authorId', as: 'author', onDelete: 'SET NULL' });
    };

    return item;
};
