import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidaService } from 'src/app/services/partida.service';
import { TimeRoutingModule } from './team-routing.module';


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
