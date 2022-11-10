import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private element: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: ElementRef) {
    if (this.element.nativeElement === target) {
      this.clickOutside.emit();
    }
  }
}
