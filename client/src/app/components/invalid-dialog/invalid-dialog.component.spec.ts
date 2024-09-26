import {
  byRole,
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { InvalidDialogComponent } from './invalid-dialog.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MockPipe } from 'ng-mocks';
import { CapitalPipe } from '../../pipes/capital/capital.pipe';

describe('InvalidDialogComponent', () => {
  let spectator: Spectator<InvalidDialogComponent>;

  const createComponent = createComponentFactory({
    component: InvalidDialogComponent,
    imports: [CapitalPipe],
    providers: [
      {
        provide: MAT_DIALOG_DATA,
        useValue: { invalid: ['name', 'email', 'phone'] },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should render the MAT_DIALOG_DATA in the UI', () => {
    const invalidFormControls = spectator.queryAll('li');
    const invalidFormControlsTextContent = invalidFormControls.map(
      (invalid) => invalid.textContent
    );

    expect(invalidFormControls).toHaveLength(3);
    expect(invalidFormControlsTextContent).toEqual([
      'Name.',
      'Email.',
      'Phone.',
    ]);
  });
});
