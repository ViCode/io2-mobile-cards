import { NgModule }      from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { MobileCardModule } from '../../components/io2-mobile-cards';
import { CardComponent } from '../../components/io2-mobile-cards/components';
import { TinderCardComponent } from '../../components/io2-mobile-cards/components';

import { App }  from './app';
import { Home } from './home/home';
import { routing } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        MobileCardModule
    ],
    declarations: [App, Home],
    bootstrap: [App],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class AppModule { }
