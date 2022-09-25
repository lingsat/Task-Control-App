import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appBoardHighlight]'
})
export class BoardHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit(): void {}

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.elementRef.nativeElement.style.backgroundColor = '#D2D2D4';      
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.elementRef.nativeElement.style.backgroundColor = '#E7EAEF';    
  }
}
