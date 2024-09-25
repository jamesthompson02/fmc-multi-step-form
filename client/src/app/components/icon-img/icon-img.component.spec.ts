import {
  byRole,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { IconImgComponent } from './icon-img.component';

describe('IconImgComponent', () => {
  let spectator: Spectator<IconImgComponent>;

  const createComponent = createComponentFactory({
    component: IconImgComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        imgSrc: 'icon-advanced.svg',
        imgAlt: 'Icon of a game controller',
        imgCssStyling: 'flex',
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should correctly render inputs in the UI template', () => {
    const iconImg = spectator.query(byRole('img'));

    expect(iconImg).toHaveAttribute('src', 'icon-advanced.svg');
    expect(iconImg).toHaveAttribute('alt', 'Icon of a game controller');
    expect(iconImg?.classList.contains('flex')).toBe(true);
  });
});
