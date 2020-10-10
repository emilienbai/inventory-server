import express from "express";
import { inject, injectable } from 'inversify';
import { IAuthorController, IRouter } from "../interfaces";
import { TYPES } from "../types";

@injectable()
export class AuthorRouter implements IRouter {
    protected router: express.Router;

    constructor(@inject(TYPES.IAuthorController) private readonly authorController: IAuthorController) {
        this.router = express.Router()
        this.router.post('/', authorController.create)
    }

    getRoutes(): express.Router {
        return this.router;
    }

}
