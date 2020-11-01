import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Author } from '../../models/Author';
import { Item } from '../../models/Item';
import { AuthorService } from '../../services/author.service';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-add-item-modal',
    templateUrl: './add-item-modal.component.html',
    styleUrls: ['./add-item-modal.component.scss']
})
export class AddItemModalComponent implements OnInit {
    @Input() close: () => void;
    public allowedTypes = Item.types;
    public availableAuthors: any[];
    public item: Item;

    public itemForm: FormGroup;

    public constructor(
        private readonly formBuilder: FormBuilder,
        private readonly itemService: ItemService,
        private readonly authorService: AuthorService
    ) {
        this.itemForm = this.formBuilder.group({
            authorId: '',
            barcode: '',
            name: '',
            type: '',
            year: ''
        });
    }

    public async ngOnInit(): Promise<void> {
        this.availableAuthors = await this.authorService.getAll();
        this.item = new Item({});
    }

    public async onSubmit(itemData) {
        this.item = new Item(itemData);
        await this.itemService.create(this.item);
        this.close();
    }

    public addAuthor = async (authorName: string): Promise<Author> => {
        return await this.authorService.create(new Author({ name: authorName }));
    };
}
