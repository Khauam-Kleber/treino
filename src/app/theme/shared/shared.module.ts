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
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

//vou liberando os imports conforme preciso

// import {A11yModule} from '@angular/cdk/a11y';
// import {CdkAccordionModule} from '@angular/cdk/accordion';
// import {ClipboardModule} from '@angular/cdk/clipboard';
// import {DragDropModule} from '@angular/cdk/drag-drop';
// import {PortalModule} from '@angular/cdk/portal';
// import {ScrollingModule} from '@angular/cdk/scrolling';
// import {CdkStepperModule} from '@angular/cdk/stepper';
// import {CdkTableModule} from '@angular/cdk/table';
// import {CdkTreeModule} from '@angular/cdk/tree';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
// import {MatBadgeModule} from '@angular/material/badge';
// import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
// import {MatButtonToggleModule} from '@angular/material/button-toggle';
// import {MatCardModule} from '@angular/material/card';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatDatepickerModule} from '@angular/material/datepicker';
// import {MatDividerModule} from '@angular/material/divider';
// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatGridListModule} from '@angular/material/grid-list';
// import {MatIconModule} from '@angular/material/icon';
// import {MatListModule} from '@angular/material/list';
// import {MatMenuModule} from '@angular/material/menu';
// import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import {MatRadioModule} from '@angular/material/radio';
// import {MatSidenavModule} from '@angular/material/sidenav';
// import {MatSliderModule} from '@angular/material/slider';
// import {MatSlideToggleModule} from '@angular/material/slide-toggle';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatTabsModule} from '@angular/material/tabs';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatTooltipModule} from '@angular/material/tooltip';
// import {MatTreeModule} from '@angular/material/tree';
// import {OverlayModule} from '@angular/cdk/overlay';

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
    NgSelectModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

    // A11yModule,
    // CdkAccordionModule,
    // ClipboardModule,
    // CdkStepperModule,
    // CdkTableModule,
    // CdkTreeModule,
    // DragDropModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // OverlayModule,
    // PortalModule,
    // ScrollingModule,
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
    NgSelectModule,
    MatStepperModule,
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,

    // A11yModule,
    // CdkAccordionModule,
    // ClipboardModule,
    // CdkStepperModule,
    // CdkTableModule,
    // CdkTreeModule,
    // DragDropModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    // MatSortModule,
    // MatTableModule,
    // MatTabsModule,
    // MatToolbarModule,
    // MatTooltipModule,
    // MatTreeModule,
    // OverlayModule,
    // PortalModule,
    // ScrollingModule,
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
