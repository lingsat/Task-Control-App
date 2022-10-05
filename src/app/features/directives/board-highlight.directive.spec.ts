import { ElementRef } from '@angular/core';
import { BoardHighlightDirective } from './board-highlight.directive';

describe('BoardHighlightDirective', () => {
  const mockElementRef: any = {
    nativeElement: {
      style: {
        backgroundColor: '#D2D2D4'
      }  
    }
  };
  it('should create an instance', () => {
    const directive = new BoardHighlightDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
