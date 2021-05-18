import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { AssociableModel, IAssignable } from '../@types/DbInterface';
import { SequelizeAttributes } from '../@types/SequelizeAttributes';
import { Author } from './Author';
import { File } from './File';
import { User } from './User';

export interface ItemAttributes {
    id?: number;
    name: string;
    type: 'book' | 'cd' | 'dvd';
    year?: number | null;
    barcode?: string | null;
    authorId: number;
    creatorId: number;
    thumbnailId?: number;

    createdAt?: Date;
    updatedAt?: Date;
}

type ItemCreationAttributes = Optional<ItemAttributes, 'id'>;

export class Item
    extends Model<ItemAttributes, ItemCreationAttributes>
    implements ItemAttributes, IAssignable<ItemAttributes> {
    public id!: number;
    public name!: string;
    public type!: 'book' | 'cd' | 'dvd';
    public year?: number | null;
    public barcode?: string | null;
    public thumbnailId?: number;

    public authorId!: number;
    public creatorId!: number;

    // timestamps!
    public createdAt?: Date;
    public readonly updatedAt?: Date;

    public readonly creator?: User | null;
    public readonly author?: Author | null;
    public readonly thumbnail?: File | null;

    public assign(data: ItemAttributes): void {
        this.name = data.name ? data.name : this.name;
        this.type = data.type ? data.type : this.type;
        this.year = data.year ? data.year : this.year;
        this.barcode = data.barcode ? data.barcode : this.barcode;
        if (!this.authorId) {
            this.authorId = data.authorId;
        }
        this.thumbnailId = data.thumbnailId ?? this.thumbnailId;
    }
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
            unique: { name: 'UniqueItemByCreatorAndType', msg: 'An item with this name and type already exists' },
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('book', 'cd', 'dvd', 'boardGame', 'videoGame'),
            unique: 'UniqueItemByCreatorAndType',
            allowNull: false
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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        creatorId: {
            type: DataTypes.INTEGER,
            unique: 'UniqueItemByCreatorAndType'
        },
        thumbnailId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    };

    const item = Item.init(attributes, {
        tableName: 'items',
        sequelize,
        defaultScope: {
            include: [
                { model: Author as any, as: 'author' },
                { model: File as any, as: 'thumbnail' }
            ]
        }
    }) as AssociableModel<Item, ItemAttributes>;

    item.associate = () => {
        Item.belongsTo(User, { foreignKey: 'creatorId', as: 'creator', onDelete: 'CASCADE' });
        Item.belongsTo(Author, { foreignKey: 'authorId', as: 'author', onDelete: 'SET NULL' });
        Item.belongsTo(File, { foreignKey: 'thumbnailId', as: 'thumbnail', onDelete: 'SET NULL' });
    };

    return item;
};
