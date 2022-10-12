import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchesTableComponent } from './matches-table.component';

const routes: Routes = [
  {
    path: '',
    component: MatchesTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MatchesTableRoutingModule { }
