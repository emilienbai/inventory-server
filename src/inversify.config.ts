import { Container } from "inversify";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { AuthorController } from "./controllers/AuthorController";
import { ItemController } from "./controllers/ItemController";
import {
  IAuthController,
  IAuthorController,
  IItemController
} from "./interfaces";
import { TYPES } from "./types";

const myContainer = new Container();
myContainer.bind<IAuthController>(TYPES.IAuthController).to(AuthenticationController);
myContainer.bind<IAuthorController>(TYPES.IAuthorController).to(AuthorController);
myContainer.bind<IItemController>(TYPES.IItemController).to(ItemController);
export { myContainer };
