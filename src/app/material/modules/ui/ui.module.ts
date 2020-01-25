import 'hammerjs';

// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// other
import { MatIconComponent } from './icons/mat-icon.component';
import { ButtonsComponent } from './material-components/buttons/buttons.component';
import { CardsComponent } from './material-components/cards/cards.component';
import { GridComponent } from './material-components/grid/grid.component';
import { ListsComponent } from './material-components/lists/lists.component';
import { MenuComponent } from './material-components/menu/menu.component';
import { TabsComponent } from './material-components/tabs/tabs.component';
import { StepperComponent } from './material-components/stepper/stepper.component';
import { ExpansionComponent } from './material-components/expansion/expansion.component';
import { ChipsComponent } from './material-components/chips/chips.component';
import { ToolbarComponent } from './material-components/toolbar/toolbar.component';
import { ProgressSnipperComponent } from './material-components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './material-components/progress/progress.component';
import { DialogComponent, DialogOverviewExampleDialog } from './material-components/dialog/dialog.component';
import { TooltipComponent } from './material-components/tooltip/tooltip.component';
import { SnackbarComponent } from './material-components/snackbar/snackbar.component';
import { SliderComponent } from './material-components/slider/slider.component';
import { SlideToggleComponent } from './material-components/slide-toggle/slide-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    MatIconComponent,
    ButtonsComponent,
    CardsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialog,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent
  ],
  declarations: [
    MatIconComponent,
    ButtonsComponent,
    CardsComponent,
    GridComponent,
    ListsComponent,
    MenuComponent,
    TabsComponent,
    StepperComponent,
    ExpansionComponent,
    ChipsComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    ProgressComponent,
    DialogComponent,
    DialogOverviewExampleDialog,
    TooltipComponent,
    SnackbarComponent,
    SliderComponent,
    SlideToggleComponent
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ]
})
export class UiModule { }
