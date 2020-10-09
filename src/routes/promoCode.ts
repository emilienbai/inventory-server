import express from "express";
import { isLoggedIn } from "../controllers/auth";
import { create, get } from "../controllers/promocode";

const promocodeRouter = express.Router();

promocodeRouter.post("/", isLoggedIn, create);

promocodeRouter.get("/", get);

export default promocodeRouter;
