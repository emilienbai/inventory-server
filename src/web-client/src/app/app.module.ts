import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AddItemModalComponent } from './components/add-item-modal/add-item-modal.component';

@NgModule({
    declarations: [LoginComponent, RootComponent, HomeComponent, ItemListComponent, AddItemModalComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [RootComponent]
})
export class AppModule {}
