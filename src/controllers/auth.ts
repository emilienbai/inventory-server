import { NextFunction, Request, Response } from "express";
import models from "../models";

async function login(req: Request, res: Response): Promise<Response> {
  try {
    await models.User.findOne({
      username: req.body.username
    });
  } catch (error) {
    console.error(error);
    return res.status(403).send();
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  return res.json({
    success: true,
    status: "You are successfully logged in!"
  });
}

function logout(req: Request, res: Response, next: NextFunction): void {
  if (req.session) {
    req.logout();
    req.session.destroy(err => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("session-id");
        res.json({
          message: "You are successfully logged out!"
        });
      }
    });
  } else {
    const err = new Error("You are not logged in!") as any;
    err.status = 403;
    next(err);
  }
}

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).send("Not logged in");
}

export { login, logout, isLoggedIn };
