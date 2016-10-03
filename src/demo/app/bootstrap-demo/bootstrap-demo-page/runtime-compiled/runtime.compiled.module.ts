import { NgModule }       from '@angular/core';
import { CommonModule }  from '@angular/common';

import { ModalModule } from '../../../../../components/io2-mobile-cards';
import { BootstrapModalModule } from '../../../../../components/io2-mobile-cards/plugins/bootstrap';

import { RuntimeCompiledComponent }   from './runtime-compiled.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    BootstrapModalModule
  ],
  declarations: [
    RuntimeCompiledComponent
  ],
  entryComponents: [
    RuntimeCompiledComponent
  ],
})
export class RuntimeCompiledModule {

}
