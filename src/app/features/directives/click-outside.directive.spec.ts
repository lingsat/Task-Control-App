import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  const mockElementRef: any = {
    nativeElement: {
      style: {
        backgroundColor: '#D2D2D4'
      }  
    }
  };
  it('should create an instance', () => {
    const directive = new ClickOutsideDirective(mockElementRef, document);
    expect(directive).toBeTruthy();
  });
});
