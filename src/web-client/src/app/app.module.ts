import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './components/root/root.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
    declarations: [LoginComponent, RootComponent, HomeComponent, ItemListComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [RootComponent]
})
export class AppModule {}
