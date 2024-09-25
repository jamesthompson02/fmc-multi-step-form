import { subscriptionAddOns, subscriptionPlans } from '../../globals/globals';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';
import { SummaryComponent } from './summary.component';
import {
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
});
