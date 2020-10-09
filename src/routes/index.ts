import express from "express";
import passport from "passport";
import { login, logout } from "../controllers/auth";
import promocodeRouter from "./promoCode";

const router = express.Router();

router.post("/login", passport.authenticate("local"), login);
router.get("/logout", logout);

router.use("/promocodes", promocodeRouter);

export default router;
