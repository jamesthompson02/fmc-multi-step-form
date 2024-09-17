import { Component, inject } from '@angular/core';
import { IconImgComponent } from '../icon-img/icon-img.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {
  STEPPER_GLOBAL_OPTIONS,
  StepperSelectionEvent,
} from '@angular/cdk/stepper';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepFormComponent } from '../step-form/step-form.component';

@Component({
  selector: 'app-multi-step-form',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  standalone: true,
  imports: [
    IconImgComponent,
    MatStepperModule,
    CommonModule,
    StepFormComponent,
  ],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.scss',
})
export class MultiStepFormComponent {
  private formBuilder = inject(FormBuilder);

  index$!: Observable<number>;

  stepperForm: FormGroup = this.formBuilder.group({
    info: this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$'),
        ],
      ],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{11}')]],
    }),
    plans: this.formBuilder.group({
      plan: ['Arcade'],
      yearly: [false],
    }),
    addOns: this.formBuilder.group({
      online: [false],
      storage: [false],
      customisableProfile: [false],
    }),
  });

  constructor(private selectedIndex: SelectedIndexService) {
    this.index$ = this.selectedIndex.selectedIndex$;
  }

  onStepperSelectionChange(event: StepperSelectionEvent) {
    this.selectedIndex.updateSelectedIndex(event.selectedIndex);
  }
}
