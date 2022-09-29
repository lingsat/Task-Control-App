import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    StopPropagationDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
