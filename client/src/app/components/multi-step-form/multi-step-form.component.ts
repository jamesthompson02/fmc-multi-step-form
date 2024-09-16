import { Component, ElementRef, viewChild } from '@angular/core';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {
  STEPPER_GLOBAL_OPTIONS,
  StepperSelectionEvent,
} from '@angular/cdk/stepper';

@Component({
  selector: 'app-multi-step-form',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  standalone: true,
  imports: [IconImgComponent, MatStepperModule],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss',
})
export class MultiStepFormComponent {
  index: number = 0;

  onStepperSelectionChange(event: StepperSelectionEvent) {
    this.index = event.selectedIndex;
  }
}
