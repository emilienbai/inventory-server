import { Request, Response } from "express";
import { injectable } from 'inversify';
import { IAuthorController } from '../interfaces';
import Author from '../models/author'

@injectable()
export class AuthorController implements IAuthorController {
    constructor() {
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            let author = new Author({
                name,
                creatorId: req.loggedInUser?.id
            });

            author = await author.save();
            return res.json(author);
        } catch (error) {
            return res.status(400);
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        throw new Error('not Implemented')
    }

    async get(req: Request, res: Response): Promise<Response> {
        throw new Error('not Implemented')
    }

    async list(req: Request, res: Response): Promise<Response> {
        throw new Error('not Implemented')
    }

    async update(req: Request, res: Response): Promise<Response> {
        throw new Error('not Implemented')
    }

}
