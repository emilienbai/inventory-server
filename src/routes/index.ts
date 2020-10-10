import express from "express";
import passport from "passport";
import { IAuthController } from "../interfaces";
import { myContainer } from "../inversify.config";
import { TYPES } from "../types";
import authorRouter from "./author";
import itemRouter from "./item";

const router = express.Router();
const authController = myContainer.get<IAuthController>(TYPES.IAuthController);

router.post("/login", passport.authenticate("local"), authController.login);
router.get("/logout", authController.logout);

router.use("/items", authController.isLoggedIn, itemRouter);
router.use("/authors", authController.isLoggedIn, authorRouter);

export default router;
