import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { ButtonComponent } from './button.component';
import { consumerAfterComputation } from '@angular/core/primitives/signals';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;

  const createComponent = createComponentFactory({
    component: ButtonComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        text: 'Click me',
        buttonCssStyling: 'test-styling',
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should render the text input and apply css from buttonCssStyling input', () => {
    const button = spectator.query(byTestId('generic-button')) as HTMLElement;

    expect(button.textContent?.trim()).toBe('Click me');
    expect(button.classList).toContain('test-styling');
  });

  it('should call the handleClick method when clicked', () => {
    const handleClickFn = jest.spyOn(spectator.component, 'handleClick');
    const button = spectator.query(byTestId('generic-button')) as HTMLElement;

    spectator.click(button);

    expect(handleClickFn).toHaveBeenCalled();
  });
});
