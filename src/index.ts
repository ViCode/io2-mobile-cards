export * from './card';
export * from './tinder-card';

import { NgModule }      from '@angular/core';

import { CardDirective }  from './card';
import { TinderCardDirective } from './tinder-card';

@NgModule({
    imports: [],
    declarations: [TinderCardDirective],
    exports: [TinderCardDirective],
    providers: [TinderCardDirective]
})
export class MobileCardModule { }
