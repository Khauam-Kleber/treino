import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TimeFormComponent } from './team-form.component';
import { TimeFormRoutingModule } from './team-form.routing.module';

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
