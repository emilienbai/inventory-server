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
    public originalItem?: Item;
    public editMode: boolean;
    public isLoading: boolean;

    public constructor(private readonly itemService: ItemService, private readonly route: ActivatedRoute) {
        this.isLoading = true;
    }

    public async ngOnInit(): Promise<void> {
        this.subscription = this.route.params.subscribe(async (params) => {
            if (params['itemId'] !== this.item?.id.toString()) {
                this.isLoading = true;
                this.item = await this.itemService.getOne(params['itemId']);
                this.isLoading = false;
            }
        });

        this.editMode = false;
    }

    public switchToEditMode(): void {
        this.originalItem = new Item(this.item);
        this.editMode = true;
    }

    public cancel(): void {
        this.item = new Item(this.originalItem);
        this.editMode = false;
    }

    public async save(): Promise<void> {
        this.item = await this.itemService.update(this.item);
        this.editMode = false;
        this.originalItem = undefined;
    }
}
