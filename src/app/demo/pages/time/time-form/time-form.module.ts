import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TimeFormComponent } from './time-form.component';
import { TimeFormRoutingModule } from './time-form.routing.module';

@NgModule({
  imports: [
    CommonModule,
    TimeFormRoutingModule,
    SharedModule,
    CommonModule , 
  ],
  declarations: [TimeFormComponent],

})
export class ItensTableModule { }
