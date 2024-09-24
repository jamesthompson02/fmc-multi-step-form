import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { SelectedIndexService } from './selected-index.service';

describe('SelectedIndexService', () => {
  let spectator: SpectatorService<SelectedIndexService>;

  let createService = createServiceFactory({
    service: SelectedIndexService,
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('should be created', () => {
    expect(spectator).toBeTruthy();
  });

  it('should update the state of the selectedIndex$ property', () => {
    spectator.service.updateSelectedIndex(2);

    let selectedIndex: number | undefined;

    spectator.service.selectedIndex$.subscribe((val) => (selectedIndex = val));

    expect(selectedIndex).toEqual(2);
  });
});
