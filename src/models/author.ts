import mongoose, {Schema, Document} from 'mongoose';
export type AuthorDocument = Document & {
    name: string;
}

const authorSchema = new Schema<AuthorDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Author = mongoose.model<AuthorDocument>('Author', authorSchema)

export default Author;