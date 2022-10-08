import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItensRoutingModule } from './itens-routing.module';
import { PartidaService } from 'src/app/services/partida.service';
import { PartidaFormComponent } from './partida-form/partida-form.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  imports: [
    CommonModule,
    ItensRoutingModule,
    SharedModule,
  ],
  declarations: [PartidaFormComponent],
  providers:[
    PartidaService
  ]
})
export class ItensModule { }
