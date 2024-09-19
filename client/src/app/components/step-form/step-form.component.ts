import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../button/button.component';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { CardRadioComponent } from '../card-radio/card-radio.component';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { PlanOption } from '../../models/plan-option.model';
import { CustomToggleComponent } from '../custom-toggle/custom-toggle.component';
import { subscriptionAddOns, subscriptionPlans } from '../../globals/globals';
import { AddOn } from '../../models/add-on.model';
import { AddOnComponent } from '../add-on/add-on.component';
import { SummaryComponent } from '../summary/summary.component';

@Component({
  selector: 'app-step-form',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ButtonComponent,
    CardRadioComponent,
    MatCheckboxModule,
    CustomToggleComponent,
    AddOnComponent,
    SummaryComponent,
  ],
  templateUrl: './step-form.component.html',
  styleUrl: './step-form.component.scss',
})
export class StepFormComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() stepperForm!: FormGroup;
  @Input() stepFormCssStyling: string = '';

  selectedStepIndex!: number;
  sub: Subscription;

  yearlyPayment!: boolean;

  plan!: string;

  planOptions!: PlanOption[];
  addOns: AddOn[] = subscriptionAddOns;

  constructor(
    private selectedIndexService: SelectedIndexService,
    private cd: ChangeDetectorRef
  ) {
    this.sub = this.selectedIndexService.selectedIndex$.subscribe(
      (selectedIndex) => (this.selectedStepIndex = selectedIndex)
    );
  }

  ngOnInit(): void {
    this.yearlyPayment = this.stepperForm.get('plans.yearly')?.value;
    this.plan = this.stepperForm.get('plans.plan')?.value;
    this.planOptions = subscriptionPlans;
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  previousStep() {
    const newIndex = this.selectedStepIndex - 1;
    this.selectedIndexService.updateSelectedIndex(newIndex);
  }

  nextStep() {
    // const isValid = this.stepperForm.get('info')?.valid;
    // if (!isValid) return;
    console.log(this.stepperForm.value);
    const newIndex = this.selectedStepIndex + 1;
    this.selectedIndexService.updateSelectedIndex(newIndex);
  }

  updateYearlyPayment(event: MatCheckboxChange) {
    this.yearlyPayment = event.checked;
  }

  updatePlan(event: MatRadioChange) {
    this.plan = event.value;
  }

  updateAddOns(event: MatCheckboxChange, formControlName: string) {
    this.addOns = this.addOns.map((addOn) => {
      const addOnNameMatch = addOn.formControlName === formControlName;
      if (!addOnNameMatch) {
        return addOn;
      } else {
        addOn.added = event.checked;
        return addOn;
      }
    });
  }
}
