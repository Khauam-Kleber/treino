import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeFormComponent } from './time-form.component';

const routes: Routes = [
  {
    path: '',
    component: TimeFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TimeFormRoutingModule { }
