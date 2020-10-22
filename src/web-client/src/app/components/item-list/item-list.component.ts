import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    public itemList: Item[];

    public constructor(protected readonly itemService: ItemService) {}

    public async ngOnInit(): Promise<void> {
        this.itemList = await this.itemService.getAll();
    }
}
