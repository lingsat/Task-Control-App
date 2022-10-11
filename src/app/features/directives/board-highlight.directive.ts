import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoardHighlight]'
})
export class BoardHighlightDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.elementRef.nativeElement.style.backgroundColor = '#D2D2D4';      
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.elementRef.nativeElement.style.backgroundColor = '#E7EAEF';    
  }
}
