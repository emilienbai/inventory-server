import { Container } from 'inversify';
import { AuthenticationController } from './controllers/AuthenticationController';
import { AuthorController } from './controllers/AuthorController';
import { ItemController } from './controllers/ItemController';
import { IAuthController, IAuthorController, IItemController, IRouter, IUtilities } from './interfaces';
import { AuthorRouter } from './routes/AuthorRouter';
import { IndexRouter } from './routes/IndexRouter';
import { ItemRouter } from './routes/ItemRouter';
import { Utilities } from './services/Utilities';
import { TYPES } from './types';

const myContainer = new Container();
myContainer.bind<IAuthController>(TYPES.IAuthController).to(AuthenticationController);
myContainer.bind<IAuthorController>(TYPES.IAuthorController).to(AuthorController);
myContainer.bind<IItemController>(TYPES.IItemController).to(ItemController);

myContainer.bind<IRouter>(TYPES.IAuthorRouter).to(AuthorRouter);
myContainer.bind<IRouter>(TYPES.IItemRouter).to(ItemRouter);
myContainer.bind<IRouter>(TYPES.IIndexRouter).to(IndexRouter);

myContainer.bind<IUtilities>(TYPES.IUtilities).to(Utilities);
export { myContainer };
