import { Request, Response } from "express";
import { injectable } from 'inversify';
import { IItemController } from '../interfaces';
import Item from '../models/item';

@injectable()
export class ItemController implements IItemController {
    constructor() {
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, type, authorId } = req.body;
            const item = new Item({
                name,
                type,
                authorId,
                creatorId: req.loggedInUser?.id
            });
            await item.save();
            return res.json(item);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        throw new Error('not Implemented')
    }

    async get(req: Request, res: Response): Promise<Response> {
        const queryParams = req.body;
        const item = await Item.findOne({ name: queryParams.name });
        if (!item) {
            return res.status(404).send("Item does not exist");
        }
        return res.json(item);
    }

    async list(req: Request, res: Response): Promise<Response> {
        throw new Error('not Implemented')
    }

    async update(req: Request, res: Response): Promise<Response> {
        throw new Error('not Implemented')
    }
}
