import { IFileUploadService } from './interfaces';

const TYPES = {
    IAuthController: Symbol.for('AuthController'),
    IAuthorController: Symbol.for('AuthorController'),
    IItemController: Symbol.for('ItemController'),

    IIndexRouter: Symbol.for('IndexRouter'),
    IAuthorRouter: Symbol.for('AuthorRouter'),
    IItemRouter: Symbol.for('ItemRouter'),

    IUtilities: Symbol.for('IUtilities'),
    IFileUploadService: Symbol.for('IFileUploadService')
};

export { TYPES };
