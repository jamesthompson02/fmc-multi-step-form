import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { ConfirmationComponent } from './confirmation.component';
import { MockComponents } from 'ng-mocks';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { HeaderComponent } from '../header/header.component';
import { ShowSummaryService } from '../../services/showSummary/show-summary.service';

describe('ConfirmationComponent', () => {
  let spectator: Spectator<ConfirmationComponent>;

  const createComponent = createComponentFactory({
    component: ConfirmationComponent,
    shallow: true,
    declarations: [MockComponents(IconImgComponent, HeaderComponent)],
    providers: [mockProvider(ShowSummaryService)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should call showSummary service to update showSummary state upon ngOnDestroy lifecycle hook firing', () => {
    const updateShowSummaryFn =
      spectator.inject(ShowSummaryService).updateShowSummaryStatus;

    spectator.component.ngOnDestroy();
    spectator.detectChanges();

    expect(updateShowSummaryFn).toHaveBeenCalledWith(true);
  });
});
