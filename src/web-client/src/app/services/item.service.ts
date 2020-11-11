import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    public constructor(private http: HttpClient) {}

    public async getAll(): Promise<Item[]> {
        const rawItems = (await this.http.get(Item.baseUrl, { withCredentials: true }).toPromise()) as any[];
        return rawItems.map((ri) => new Item(ri));
    }

    public async getOne(itemId: number): Promise<Item> {
        const rawItem = await this.http.get(Item.baseUrl + '/' + itemId, { withCredentials: true }).toPromise();
        return new Item(rawItem);
    }

    public async create(item: Item): Promise<Item> {
        const rawItem = await this.http.post(Item.baseUrl, item.toJSON(), { withCredentials: true }).toPromise();
        return new Item(rawItem);
    }
}
