import { Request, Response } from 'express';
import { injectable } from 'inversify';
import { IItemController } from '../interfaces';
import { Item } from '../models/Item';

@injectable()
export class ItemController implements IItemController {
    public constructor() {}

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            let { name, type, authorId } = req.body;
            let item = Item.build({
                name,
                type,
                authorId: req.loggedInUser.id,
                creatorId: authorId
            });
            await item.save({ logging: console.log });
            return res.json(item);
        } catch (error) {
            return res.status(400).send(error.message);
        }
    }

    public async get(req: Request, res: Response): Promise<Response> {
        const itemId = req.params.itemId;
        const item = await Item.findOne({
            where: {
                id: itemId,
                creatorId: req.loggedInUser.id
            }
        });
        if (!item) {
            return res.status(404).send('Item does not exist');
        }
        return res.json(item);
    }
}
