import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Item } from '../../models/Item';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    @ViewChild('modal') modal: TemplateRef<any>;
    @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainerRef: ViewContainerRef;
    backdrop: any;

    public itemList: Item[];

    public constructor(protected readonly itemService: ItemService) {}

    public async ngOnInit(): Promise<void> {
        this.itemList = await this.itemService.getAll();
    }

    showDialog() {
        let view = this.modal.createEmbeddedView(null);
        this.modalContainerRef.insert(view);
        this.modal.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
        this.modal.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
        this.modal.elementRef.nativeElement.previousElementSibling.style.display = 'block';
        this.backdrop = document.createElement('DIV');
        this.backdrop.className = 'modal-backdrop';
        document.body.appendChild(this.backdrop);
    }

    closeDialog() {
        this.modalContainerRef.clear();
        document.body.removeChild(this.backdrop);
    }
}
