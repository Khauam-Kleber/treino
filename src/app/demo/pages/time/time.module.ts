import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensService } from 'src/app/services/itens.service';
import { TimeRoutingModule } from './time-routing.module';


@NgModule({
  imports: [
    CommonModule,
    TimeRoutingModule
  ],
  declarations: [],
  providers:[
    // ItensService
  ]
})
export class TimeModule { }
