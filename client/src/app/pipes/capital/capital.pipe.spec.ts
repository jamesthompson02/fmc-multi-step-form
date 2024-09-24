import { CapitalPipe } from './capital.pipe';
import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';

describe('CapitalPipe', () => {
  let spectator: SpectatorPipe<CapitalPipe>;
  const createPipe = createPipeFactory(CapitalPipe);

  it('should capitalise the first letter in  a given word', () => {
    spectator = createPipe(`{{ 'name' | capital }}`);
    console.log(spectator.element);
    expect(spectator.element.textContent).toBe('Name');
  });
});
