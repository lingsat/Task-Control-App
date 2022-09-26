import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/dashboard/board/board.component';
import { BoardHighlightDirective } from './directives/board-highlight.directive';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FeaturesRoutingModule } from './features-routing.module';
import { AddBoardFormComponent } from './components/dashboard/forms/add-board-form/add-board-form.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { AddTaskFormComponent } from './components/dashboard/forms/add-task-form/add-task-form.component';



@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    BoardHighlightDirective,
    AddBoardFormComponent,
    ClickOutsideDirective,
    AddTaskFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FeaturesRoutingModule,
    FormsModule
  ],
})
export class FeaturesModule { }
