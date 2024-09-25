import {
  byRole,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        text: 'Test Header',
        size: 4,
        headerCssStyling: 'header',
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should render all inputs appropriately in the view template', () => {
    const header = spectator.query(byRole('heading', { level: 4 }));

    expect(header).toBeTruthy();
    expect(header?.textContent).toBe('Test Header');
    expect(header?.classList.contains('header')).toBe(true);
  });
});
