import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { CustomToggleComponent } from './custom-toggle.component';

describe('CustomToggleComponent', () => {
  let spectator: Spectator<CustomToggleComponent>;

  const createComponent = createComponentFactory({
    component: CustomToggleComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        yearly: true,
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should display the correct UI based on the yearly input being true', () => {
    const monthlyStrong = spectator.query(byTestId('monthly-strong'));
    const toggleSwitch = spectator.query(byTestId('toggle-switch'));
    const yearlyStrong = spectator.query(byTestId('yearly-strong'));

    expect(monthlyStrong).toBeFalsy();
    expect(toggleSwitch?.classList).toContain('padding-left');
    expect(yearlyStrong).toBeTruthy();
  });

  it('should display the correct UI based on the yearly input being false', () => {
    spectator = createComponent({
      props: {
        yearly: false,
      },
    });

    const monthlyStrong = spectator.query(byTestId('monthly-strong'));
    const toggleSwitch = spectator.query(byTestId('toggle-switch'));
    const yearlyStrong = spectator.query(byTestId('yearly-strong'));

    expect(yearlyStrong).toBeFalsy();
    expect(toggleSwitch?.classList.contains('padding-left')).toBe(false);
    expect(monthlyStrong).toBeTruthy();
  });
});
