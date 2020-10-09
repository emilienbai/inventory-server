import mongoose, { PassportLocalDocument, PassportLocalModel } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
export type UserDocument = PassportLocalDocument & {
    userName: string;
}
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model<UserDocument>('User', userSchema) as PassportLocalModel<UserDocument>;

export default User;