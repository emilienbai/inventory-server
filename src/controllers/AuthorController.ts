import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IAuthorController } from '../interfaces';
import { Author } from '../models/Author';
import { User } from '../models/User';

@injectable()
export class AuthorController implements IAuthorController {
    public constructor() {}

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            let author = new Author({
                name,
                creatorId: req.loggedInUser.id
            });

            author = await author.save();
            return res.status(201).json(author);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    public async get(req: Request, res: Response): Promise<Response> {
        try {
            const author = await Author.findOne({
                where: { id: req.params.authorId, creatorId: req.loggedInUser.id },
                include: [{ model: User as any, as: 'creator' }],
                rejectOnEmpty: true
            });
            return res.json(author);
        } catch (error: unknown) {
            return res.status(404).send(error);
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const authors = await Author.findAll({ where: { creatorId: req.loggedInUser.id }, order: ['name'] });
        return res.status(200).send(authors);
    }
}
