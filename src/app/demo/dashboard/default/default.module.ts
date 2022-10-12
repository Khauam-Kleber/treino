import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';
import { DefaultComponent } from './default.component';
// import { SkinDialogForm } from '../../pages/matches-table/skin-dialog-form/skin-dialog-form.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule
  ],
  declarations: [DefaultComponent]
})
export class DefaultModule { }
