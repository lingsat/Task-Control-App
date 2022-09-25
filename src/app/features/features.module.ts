import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/dashboard/board/board.component';
import { BoardHighlightDirective } from './directives/board-highlight.directive';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    BoardHighlightDirective,
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    DashboardComponent,
    BoardComponent,
    AuthComponent
  ]
})
export class FeaturesModule { }
