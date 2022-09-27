import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentHeaderComponent } from './content-header/content-header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { StopPropagationDirective } from './directives/stop-propagation.directive';



@NgModule({
  declarations: [
    ContentHeaderComponent,
    LoadingSpinnerComponent,
    StopPropagationDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentHeaderComponent,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
