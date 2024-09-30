import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { MultiStepFormComponent } from './multi-step-form.component';
import { MockComponent } from 'ng-mocks';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { StepFormComponent } from '../step-form/step-form.component';
import { FormBuilder } from '@angular/forms';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';
import { of } from 'rxjs';
import { MatStep, MatStepper } from '@angular/material/stepper';

describe('MultiStepFormComponent', () => {
  let spectator: Spectator<MultiStepFormComponent>;

  const createComponent = createComponentFactory({
    component: MultiStepFormComponent,
    shallow: true,
    declarations: [
      MockComponent(IconImgComponent),
      MockComponent(StepFormComponent),
    ],
    providers: [
      mockProvider(FormBuilder),
      mockProvider(SelectedIndexService, {
        selectedIndex$: of(0),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should update the selectedIndex$ when the mat-stepper fires a selectionChange event', () => {
    const matStepper = spectator.query(MatStepper);
    const onStepperSelectionChangeFn = jest.spyOn(
      spectator.component,
      'onStepperSelectionChange'
    );
    const updateSelectedIndexFn =
      spectator.inject(SelectedIndexService).updateSelectedIndex;

    matStepper?.selectionChange.emit({
      previouslySelectedIndex: 0,
      previouslySelectedStep: MatStep.prototype,
      selectedIndex: 1,
      selectedStep: MatStep.prototype,
    });
    spectator.detectChanges();

    expect(matStepper).toBeTruthy();
    expect(onStepperSelectionChangeFn).toHaveBeenCalledWith({
      previouslySelectedIndex: 0,
      previouslySelectedStep: MatStep.prototype,
      selectedIndex: 1,
      selectedStep: MatStep.prototype,
    });
    expect(updateSelectedIndexFn).toHaveBeenCalledWith(1);
  });
});
