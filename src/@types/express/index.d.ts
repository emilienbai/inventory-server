import * as m from '../../models/User';

declare global {
    namespace Express {
        interface Request {
            loggedInUser: m.User;
        }
    }
}
