import express from "express";
import { IAuthorController } from "../interfaces";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";

const authorController = myContainer.get<IAuthorController>(
  TYPES.IAuthorController
);

const authorRouter = express.Router();
authorRouter.post("/", authorController.create);

export default authorRouter;
