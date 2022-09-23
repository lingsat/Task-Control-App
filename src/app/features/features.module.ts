import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/board/board.component';
import { BoardHighlightDirective } from './directives/board-highlight.directive';



@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    BoardHighlightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    BoardComponent
  ]
})
export class FeaturesModule { }
