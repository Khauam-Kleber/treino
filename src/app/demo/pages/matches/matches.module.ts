import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchesRoutingModule } from './matches-routing.module';
import { PartidaService } from 'src/app/services/partida.service';
import { MatchFormComponent } from './match-form/match-form.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    MatchesRoutingModule,
    SharedModule,
  ],
  declarations: [MatchFormComponent],
  providers:[
    PartidaService
  ]
})
export class MatchesModule { }
