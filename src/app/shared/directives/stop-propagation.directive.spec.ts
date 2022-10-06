import { StopPropagationDirective } from './stop-propagation.directive';

describe('StopPropagationDirective', () => {
  const directive = new StopPropagationDirective();
  
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should return undefined onClick', () => {
    const click = new MouseEvent('click');
    expect(directive.onClick(click)).toBeUndefined();
  });
});
