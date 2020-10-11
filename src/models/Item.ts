import { BuildOptions, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { SequelizeAttributes } from '../@types/SequelizeAttributes';

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
}

export const ItemFactory = (sequelize: Sequelize): Model<Item, ItemAttributes> => {
    const attributes: SequelizeAttributes<ItemAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT
        },
        type: {
            type: DataTypes.ENUM('book', 'cd', 'dvd')
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
            type: DataTypes.INTEGER
        }
    };

    return Item.init(attributes, { tableName: 'items', sequelize });
};
