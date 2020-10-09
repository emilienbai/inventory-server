import { Request, Response } from 'express';
import models from '../models';

async function get(req: Request , res: Response):Promise<Response> {
    const queryParams = req.body;
    const promoCode = await models.PromoCode.findOne({ name: queryParams.promocode_name });
    if (!promoCode) {
        return res.status(404).send("Promocode does not exist")
    }
    return res.json(promoCode);
}

async function create(req: Request , res: Response):Promise<Response> {
    try {
        const { name, avantage, restrictions } = req.body
        const promoCode = new models.PromoCode({
            name,
            avantage,
            restrictions
        })
        await promoCode.save();
        return res.json(promoCode);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export {
    get,
    create
};