import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IAuthorController, IUtilities } from '../interfaces';
import { Author } from '../models/Author';
import { User } from '../models/User';
import { QueryParametersParsingError } from '../services/Utilities';
import { TYPES } from '../types';

@injectable()
export class AuthorController implements IAuthorController {
    public constructor(@inject(TYPES.IUtilities) private readonly utilities: IUtilities) {}

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
            return res.status(404).send();
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const options = this.utilities.parseQueryParameters<Author>(req.query, Author);
            const whereOptions = this.utilities.parseFilterOptions<Author>(req.query, Author);
            const authors = await Author.findAll({
                where: { ...whereOptions, creatorId: req.loggedInUser.id },
                order: ['name'],
                ...options
            });
            return res.status(200).send(authors);
        } catch (error: unknown) {
            if (error instanceof QueryParametersParsingError) {
                return res.status(400).send(error.message);
            }
            return res.status(500).send();
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        let author: Author;
        try {
            author = await Author.findOne({
                where: { id: req.params.authorId, creatorId: req.loggedInUser.id },
                rejectOnEmpty: true
            });
        } catch (error) {
            return res.status(404).send();
        }
        try {
            author.assign(req.body);
            await author.save();
            return res.json(author);
        } catch (error) {
            return res.json(500).send();
        }
    }
}
