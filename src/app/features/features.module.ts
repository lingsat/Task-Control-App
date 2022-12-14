import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/dashboard/board/board.component';
import { BoardHighlightDirective } from './directives/board-highlight.directive';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';
import { AddBoardFormComponent } from './components/dashboard/forms/add-board-form/add-board-form.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { AddTaskFormComponent } from './components/dashboard/forms/add-task-form/add-task-form.component';
import { TaskComponent } from './components/dashboard/board/task/task.component';
import { FilteringPipe } from './pipes/filtering.pipe';
import { SortingPipe } from './pipes/sorting.pipe';
import { TasksfilterPipe } from './pipes/tasksfilter.pipe';
import { ArchiveComponent } from './components/archive/archive.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    AddBoardFormComponent,
    AddTaskFormComponent,
    BoardHighlightDirective,
    ClickOutsideDirective,
    TaskComponent,
    ArchiveComponent,
    FilteringPipe,
    SortingPipe,
    TasksfilterPipe,
  ],
  imports: [CommonModule, FeaturesRoutingModule, FormsModule, SharedModule],
})
export class FeaturesModule {}
