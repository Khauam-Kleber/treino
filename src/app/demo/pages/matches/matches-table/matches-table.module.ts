import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MatchesTableRoutingModule } from './matches-table.routing.module';
import { MatchesTableComponent } from './matches-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatchesTableRoutingModule,
    SharedModule,
    CommonModule , 
  ],
  declarations: [MatchesTableComponent],

})
export class MatchesTableModule { }
