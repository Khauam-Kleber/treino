import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidaService } from 'src/app/services/partida.service';
import { TimeRoutingModule } from './time-routing.module';


@NgModule({
  imports: [
    CommonModule,
    TimeRoutingModule
  ],
  declarations: [],
  providers:[
    PartidaService
  ]
})
export class TimeModule { }
