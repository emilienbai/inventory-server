import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user';

export type AuthorDocument = Document & {
    name: string;
    creator: UserDocument;
};

const authorSchema = new Schema<AuthorDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Author = mongoose.model<AuthorDocument>('Author', authorSchema);

export default Author;
