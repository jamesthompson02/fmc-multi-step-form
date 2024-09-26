import { subscriptionAddOns, subscriptionPlans } from '../../globals/globals';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';
import { SummaryComponent } from './summary.component';
import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';

describe('SummaryComponent', () => {
  let spectator: Spectator<SummaryComponent>;

  const createComponent = createComponentFactory({
    component: SummaryComponent,
    providers: [mockProvider(SelectedIndexService)],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        plan: 'Arcade',
        addOns: subscriptionAddOns,
        planOptions: subscriptionPlans,
        yearly: true,
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should render data from the inputs appropriately in the UI when yearly input is true', () => {
    const planName = spectator.query(byTestId('plan-name-yearly'));
    const planPriceYearly = spectator.query(byTestId('plan-price-yearly'));
    const totalPrice = spectator.query(byTestId('total-price'));

    expect(planName?.textContent?.trim()).toBe('Arcade (Yearly)');
    expect(planPriceYearly?.textContent?.trim()).toBe('$90/year');
    expect(totalPrice?.textContent?.trim()).toBe('$90/year');
  });

  it('should successfully assign values to the selectedPlanOption and totalPrice properties', () => {
    const calculateTotalPriceFn = jest.spyOn(
      spectator.component,
      'calculateTotalPrice'
    );
    const extractNumberFromStringFn = jest.spyOn(
      spectator.component,
      'extractNumberFromString'
    );
    const selectedPlanOption = spectator.component.selectedPlanOption;

    spectator.component.ngOnInit();
    spectator.detectChanges();

    expect(calculateTotalPriceFn).toHaveLastReturnedWith('$90/year');
    expect(extractNumberFromStringFn).toHaveBeenCalledTimes(1);
    expect(extractNumberFromStringFn).toHaveLastReturnedWith('90');
    expect(selectedPlanOption).toEqual({
      value: 'Arcade',
      cardImg: 'icon-arcade.svg',
      cardImgAlt: 'Icon of old joystick controller.',
      price: { monthly: '$9/month', yearly: '$90/year' },
    }); //use toEqual rather than toBe because toBe should only be used with primitive types
  });

  it('should redirect user to step 2 of form when change is clicked', () => {
    const change = spectator.query(byTestId('change')) as HTMLSpanElement;
    const changePlanFn = jest.spyOn(spectator.component, 'changePlan');
    const updateSelectedIndexFn =
      spectator.inject(SelectedIndexService).updateSelectedIndex;

    spectator.click(change);
    spectator.detectChanges();

    expect(changePlanFn).toHaveBeenCalled();
    expect(updateSelectedIndexFn).toHaveBeenCalledWith(1);
  });
});
