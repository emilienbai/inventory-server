import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IAuthorController } from '../interfaces';
import Author from '../models/author';

@injectable()
export class AuthorController implements IAuthorController {
    constructor() {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            let author = new Author({
                name,
                creator: req.loggedInUser.id
            });

            author = await author.save();
            return res.json(author);
        } catch (error) {
            return res.status(400);
        }
    }
}
