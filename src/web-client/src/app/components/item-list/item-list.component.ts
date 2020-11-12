import { Component, OnInit, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Item } from '../../models/Item';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
    public faEdit = faEdit;
    public faTrash = faTrash;
    @ViewChild('modal') modal: TemplateRef<any>;
    @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainerRef: ViewContainerRef;
    private backdrop: any;

    public itemList: Item[];

    public constructor(protected readonly itemService: ItemService, private readonly router: Router) {}

    public async ngOnInit(): Promise<void> {
        this.itemList = await this.itemService.getAll();
    }

    public showDialog(): void {
        let view = this.modal.createEmbeddedView(null);
        this.modalContainerRef.insert(view);
        this.modal.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
        this.modal.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
        this.modal.elementRef.nativeElement.previousElementSibling.style.display = 'block';
        this.backdrop = document.createElement('DIV');
        this.backdrop.className = 'modal-backdrop';
        document.body.appendChild(this.backdrop);
    }

    public closeDialog(): void {
        this.modalContainerRef.clear();
        document.body.removeChild(this.backdrop);
    }
}
