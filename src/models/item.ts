import mongoose, { Document, Schema } from 'mongoose';
import { AuthorDocument } from './author';
import { UserDocument } from './user';

type ItemDocument = Document & {
    name: string;
    author: AuthorDocument;
    type: string;
    year?: number;
    barcode?: string;
    creator: UserDocument;
};
const itemSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['book', 'cd', 'dvd']
        },
        year: {
            type: Number,
            required: false
        },
        barCode: {
            type: String,
            required: false
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

const Item = mongoose.model<ItemDocument>('Item', itemSchema);

export default Item;
