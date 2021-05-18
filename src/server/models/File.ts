import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { AssociableModel, IAssignable } from '../@types/DbInterface';
import { SequelizeAttributes } from '../@types/SequelizeAttributes';
import { CloudinaryUploadResult } from '../config/cloudinary/cloudinaryConfig';

export interface FileAttribute {
    id?: number;
    name: string;
    externalId: string;
    externalVersion: string;
    url: string;
}

type FileCreationAttributes = Optional<FileAttribute, 'id'>;

export class File
    extends Model<FileAttribute, FileCreationAttributes>
    implements FileAttribute, IAssignable<FileAttribute> {
    public id!: number;
    public name!: string;
    public externalId!: string;
    public externalVersion!: string;
    public url!: string;

    // timestamps!
    public createdAt?: Date;
    public readonly updatedAt?: Date;

    public assign(data: FileAttribute): void {
        this.name = data.name ?? this.name;
        this.externalId = data.externalId ?? this.externalId;
        this.externalVersion = data.externalVersion;
    }

    public static fromCloudinary(name: string, result: CloudinaryUploadResult): File {
        return new File({
            name,
            externalId: result.public_id,
            externalVersion: result.version,
            url: result.secure_url
        });
    }
}

export const FileFactory = (sequelize: Sequelize): AssociableModel<File, FileAttribute> => {
    const attributes: SequelizeAttributes<FileAttribute> = {
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
        externalId: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        externalVersion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    };

    const file = File.init(attributes, {
        tableName: 'files',
        sequelize
    }) as AssociableModel<File, FileAttribute>;
    return file;
};
