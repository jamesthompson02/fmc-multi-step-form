import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { ShowSummaryService } from './show-summary.service';

describe('ShowSummaryService', () => {
  let spectator: SpectatorService<ShowSummaryService>;

  let createService = createServiceFactory({
    service: ShowSummaryService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('should successfully update the state of the showSummary$ observable', () => {
    spectator.service.updateShowSummaryStatus(false);

    let showSummary: boolean | undefined;

    spectator.service.showSummary$.subscribe((val) => (showSummary = val));

    expect(showSummary).toEqual(false);
  });
});
