import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../../models/Item';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
    private subscription: Subscription;
    public item: Item;

    public constructor(private readonly itemService: ItemService, private readonly route: ActivatedRoute) {}

    public async ngOnInit(): Promise<void> {
        this.subscription = this.route.params.subscribe(async (params) => {
            if (params['itemId'] !== this.item?.id.toString()) {
                this.item = await this.itemService.getOne(params['itemId']);
            }
        });
    }
}
