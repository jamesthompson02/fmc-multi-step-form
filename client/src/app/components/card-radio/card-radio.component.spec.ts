import {
  byTestId,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { CardRadioComponent } from './card-radio.component';
import { MockComponents } from 'ng-mocks';
import { IconImgComponent } from '../icon-img/icon-img.component';

describe('CardRadioComponent', () => {
  let spectator: Spectator<CardRadioComponent>;

  const createComponent = createComponentFactory({
    component: CardRadioComponent,
    shallow: true,
    declarations: [MockComponents(IconImgComponent)],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        value: {
          value: 'Arcade',
          cardImg: 'icon-arcade.svg',
          cardImgAlt: 'Icon of old joystick controller.',
          price: { monthly: '$9/month', yearly: '$90/year' },
        },
        yearly: true,
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should render values from the value input correctly in the UI when yearly input is true', () => {
    const cardRadioHeading = spectator.query(byTestId('card-radio-heading'));
    const cardRadioMonthlyPrice = spectator.query(
      byTestId('card-radio-monthly')
    );
    const cardRadioYearlyPrice = spectator.query(byTestId('card-radio-yearly'));

    expect(cardRadioHeading?.textContent).toBe('Arcade');
    expect(cardRadioMonthlyPrice).toBeFalsy();
    expect(cardRadioYearlyPrice).toBeTruthy();
    expect(cardRadioYearlyPrice?.textContent?.trim()).toBe('$90/year');
  });

  it('should render values from the value input correctly in the UI when yearly input is false', () => {
    spectator = createComponent({
      props: {
        value: {
          value: 'Arcade',
          cardImg: 'icon-arcade.svg',
          cardImgAlt: 'Icon of old joystick controller.',
          price: { monthly: '$9/month', yearly: '$90/year' },
        },
        yearly: false,
      },
    });

    const cardRadioHeading = spectator.query(byTestId('card-radio-heading'));
    const cardRadioMonthlyPrice = spectator.query(
      byTestId('card-radio-monthly')
    );
    const cardRadioYearlyPrice = spectator.query(byTestId('card-radio-yearly'));

    expect(cardRadioHeading?.textContent).toBe('Arcade');
    expect(cardRadioYearlyPrice).toBeFalsy();
    expect(cardRadioMonthlyPrice).toBeTruthy();
    expect(cardRadioMonthlyPrice?.textContent?.trim()).toBe('$9/month');
  });
});
