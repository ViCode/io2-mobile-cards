import { NgModule }       from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ModalModule } from '../../../../../../components/io2-mobile-cards';

import { InnerRuntimeCompiledComponent }   from './inner-runtime-compiled.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [
    InnerRuntimeCompiledComponent
  ],
  entryComponents: [
    InnerRuntimeCompiledComponent
  ],
})
export class InnerRuntimeCompiledModule {

}
