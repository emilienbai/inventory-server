import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IItemController } from '../interfaces';
import Author, { AuthorDocument } from '../models/author';
import Item from '../models/item';
import { UserDocument } from '../models/user';

@injectable()
export class ItemController implements IItemController {
    constructor() {}

    async create(req: Request, res: Response): Promise<Response> {
        try {
            let { name, type, author } = req.body;
            author = await this.getOrCreateAuthor(author, req.loggedInUser);
            let item = new Item({
                name,
                type,
                author: author.id,
                creator: req.loggedInUser.id
            });
            await item.save();
            await item.populate('author').execPopulate();
            return res.json(item);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    async get(req: Request, res: Response): Promise<Response> {
        const itemId = req.params.itemId;
        const item = await Item.findOne({
            _id: itemId,
            creator: req.loggedInUser.id
        }).populate('author');
        if (!item) {
            return res.status(404).send('Item does not exist');
        }
        return res.json(item);
    }

    private async getOrCreateAuthor(
        author: string | AuthorDocument,
        loggedInUser: UserDocument
    ): Promise<AuthorDocument> {
        const authorId = this.extractAuthorId(author);
        if (!!authorId) {
            let existingAuthor = await Author.findOne({
                _id: author,
                creator: loggedInUser.id
            });
            if (!existingAuthor) {
                throw new Error('The specified author does not exists');
            }
            return existingAuthor;
        } else {
            author = author as AuthorDocument;
            const newAuthor = new Author({
                name: author.name,
                creator: loggedInUser.id
            });
            return await newAuthor.save();
        }
    }

    private extractAuthorId(author: string | AuthorDocument): string | null {
        let authorId: string;
        if (typeof author === 'string') {
            authorId = author;
        } else {
            let { _id } = author;
            authorId = _id;
        }
        return authorId;
    }
}
