import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AlertModule, BreadcrumbModule, CardModule, ModalModule} from './components';
import {DataFilterPipe} from './components/data-table/data-filter.pipe';
import {TodoListRemoveDirective} from './components/todo/todo-list-remove.directive';
import {TodoCardCompleteDirective} from './components/todo/todo-card-complete.directive';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ClickOutsideModule} from 'ng-click-outside';
import {SpinnerComponent} from './components/spinner/spinner.component';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { FlexLayoutModule } from "@angular/flex-layout";

import 'hammerjs';
import 'mousetrap';
import {GalleryModule} from '@ks89/angular-modal-gallery';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    GalleryModule.forRoot(),
    ClickOutsideModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    NgSelectModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    GalleryModule,
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    ClickOutsideModule,
    SpinnerComponent,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    NgSelectModule
  ],
  declarations: [
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    SpinnerComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
