import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IFileUploadService, IItemController, IUtilities } from '../interfaces';
import { Item } from '../models/Item';
import { QueryParametersParsingError } from '../services/Utilities';
import { TYPES } from '../types';

@injectable()
export class ItemController implements IItemController {
    public constructor(
        @inject(TYPES.IUtilities) private readonly utilities: IUtilities,
        @inject(TYPES.IFileUploadService) private readonly fileUploadService: IFileUploadService
    ) {}

    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const item = new Item();
            item.assign(req.body);
            item.creatorId = req.loggedInUser.id;
            await item.save();
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

    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const options = this.utilities.parseQueryParameters<Item>(req.query, Item);
            const whereOptions = this.utilities.parseFilterOptions<Item>(req.query, Item);
            const items = await Item.findAll({
                where: { ...whereOptions, creatorId: req.loggedInUser.id },
                order: ['name'],
                ...options
            });
            return res.status(200).send(items);
        } catch (error: unknown) {
            if (error instanceof QueryParametersParsingError) {
                return res.status(400).send(error.message);
            }
            return res.status(500).send();
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        let item: Item;
        try {
            item = await Item.findOne({
                where: { id: req.params.itemId, creatorId: req.loggedInUser.id },
                rejectOnEmpty: true
            });
        } catch (error) {
            return res.status(404).send();
        }
        try {
            item.assign(req.body);
            await item.save();
            return res.json(item);
        } catch (error) {
            return res.json(500).send();
        }
    }

    public async updateThumbnail(req: Request, res: Response, next?: NextFunction): Promise<Response> {
        let item: Item;
        try {
            item = await Item.findOne({
                where: { id: req.params.itemId, creatorId: req.loggedInUser.id },
                rejectOnEmpty: true
            });
        } catch (error) {
            return res.status(404).send();
        }
        // @ts-ignore
        const f = req['files'].thumbnail;
        const file = await this.fileUploadService.uploadFromBuffer(f.name, f.data);
        item.thumbnailId = file.id;
        await item.save();
        await item.reload();
        //todo remove previous
        //todo transaction

        return res.json(item);
    }
}
