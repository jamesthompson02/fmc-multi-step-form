import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { AddOnComponent } from './add-on.component';

describe('AddOnComponent', () => {
  let spectator: Spectator<AddOnComponent>;

  const createComponent = createComponentFactory({
    component: AddOnComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        value: {
          formControlName: 'online',
          heading: 'Online service',
          subHeading: 'Access to multiplayer games',
          price: { monthly: '+$1/month', yearly: '+$10/year' },
          added: false,
        },
        yearly: true,
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should display the value input in the view template correctly based on when yearly input is true', () => {
    const addOnHeading = spectator.query(byTestId('add-on-heading'));
    const addOnSubHeading = spectator.query(byTestId('add-on-sub-heading'));
    const addOnYearlyPrice = spectator.query(byTestId('add-on-yearly'));

    expect(addOnHeading?.textContent).toBe('Online service');
    expect(addOnSubHeading?.textContent).toBe('Access to multiplayer games');
    expect(addOnYearlyPrice).toBeTruthy();
    expect(addOnYearlyPrice?.textContent).toBe('+$10/year');
  });

  it('should display the value input in the view template correctly based on when yearly input is false', () => {
    spectator = createComponent({
      props: {
        value: {
          formControlName: 'online',
          heading: 'Online service',
          subHeading: 'Access to multiplayer games',
          price: { monthly: '+$1/month', yearly: '+$10/year' },
          added: false,
        },
        yearly: false, // changed compared to what's in beforeEach
      },
    });
    const addOnHeading = spectator.query(byTestId('add-on-heading'));
    const addOnSubHeading = spectator.query(byTestId('add-on-sub-heading'));
    const addOnMonthlyPrice = spectator.query(byTestId('add-on-monthly'));

    expect(addOnHeading?.textContent).toBe('Online service');
    expect(addOnSubHeading?.textContent).toBe('Access to multiplayer games');
    expect(addOnMonthlyPrice).toBeTruthy();
    expect(addOnMonthlyPrice?.textContent).toBe('+$1/month');
  });
});
