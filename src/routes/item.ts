import express from "express";
import { IItemController } from "../interfaces";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";

const itemController = myContainer.get<IItemController>(TYPES.IItemController);
const itemRouter = express.Router();

itemRouter.post("/", itemController.create);

itemRouter.get("/", itemController.get);

export default itemRouter;
