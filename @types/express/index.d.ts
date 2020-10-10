import { UserDocument } from '../../src/models/user';

declare global {
    namespace Express {
        interface Request {
            loggedInUser: UserDocument | null
        }
    }
}

