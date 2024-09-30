import {
  byTestId,
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator/jest';
import { StepFormComponent } from './step-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MockComponent } from 'ng-mocks';
import { InvalidDialogComponent } from '../invalid-dialog/invalid-dialog.component';
import { HeaderComponent } from '../header/header.component';
import { ButtonComponent } from '../button/button.component';
import { CardRadioComponent } from '../card-radio/card-radio.component';
import { CustomToggleComponent } from '../custom-toggle/custom-toggle.component';
import { AddOnComponent } from '../add-on/add-on.component';
import { SummaryComponent } from '../summary/summary.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';
import { ShowSummaryService } from '../../services/showSummary/show-summary.service';
import { PostFormDataService } from '../../services/postFormData/post-form-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { subscriptionPlans } from '../../globals/globals';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { AddOn } from '../../models/add-on.model';

describe('StepFormComponent', () => {
  let spectator: Spectator<StepFormComponent>;

  const createComponent = createComponentFactory({
    component: StepFormComponent,
    imports: [MatCheckboxModule],
    mocks: [MatDialog],
    declarations: [
      MockComponent(InvalidDialogComponent),
      MockComponent(HeaderComponent),
      MockComponent(ButtonComponent),
      MockComponent(CardRadioComponent),
      MockComponent(CustomToggleComponent),
      MockComponent(AddOnComponent),
      MockComponent(SummaryComponent),
      MockComponent(ConfirmationComponent),
    ],
    providers: [
      mockProvider(SelectedIndexService, {
        selectedIndex$: of(0),
      }),
      mockProvider(ShowSummaryService, {
        showSummary$: of(true),
      }),
      mockProvider(PostFormDataService),
    ],
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        stepperForm: new FormGroup({
          info: new FormGroup({
            name: new FormControl('', [
              Validators.required,
              Validators.pattern('^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$'),
              Validators.maxLength(60),
            ]),
            email: new FormControl('', [
              Validators.email,
              Validators.required,
              Validators.maxLength(60),
            ]),
            phone: new FormControl('', [
              Validators.required,
              Validators.pattern('[0-9 ]{11}'),
            ]),
          }),
          plans: new FormGroup({
            plan: new FormControl('Arcade'),
            yearly: new FormControl(false),
          }),
          addOns: new FormGroup({
            online: new FormControl(false),
            storage: new FormControl(false),
            customisableProfile: new FormControl(false),
          }),
        }),
      },
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('should correctly assign values to properties once initialised', () => {
    const selectedIndex = spectator.component.selectedStepIndex;
    let showSummary: boolean | undefined;
    const yearlyPayment = spectator.component.yearlyPayment;
    const plan = spectator.component.plan;
    const planOptions = spectator.component.planOptions;
    const assignAddOnsFn = jest.spyOn(spectator.component, 'assignAddOns');

    spectator.component.ngOnInit();
    spectator.detectChanges();

    spectator.component.showSummary$.subscribe((val) => (showSummary = val));

    expect(selectedIndex).toBe(0);
    expect(showSummary).toBe(true);
    expect(yearlyPayment).toBe(false);
    expect(plan).toBe('Arcade');
    expect(planOptions).toEqual(subscriptionPlans);
    expect(assignAddOnsFn).toHaveBeenCalled();
  });

  it('should call changeDetectorRef when ngAfterViewChecked lifecycle hook occurs', () => {
    const cdrDetectChangesFn = jest.spyOn(
      (spectator.component as any).cdr,
      'detectChanges'
    );
    spectator.component.ngAfterViewChecked();
    spectator.detectChanges();

    expect(cdrDetectChangesFn).toHaveBeenCalled();
  });

  it('should unsubscribe from any subscription when ngOnDestroy lifecycle hook occurs', () => {
    const unsubscribeFn = jest.spyOn(spectator.component.sub, 'unsubscribe');

    spectator.component.ngOnDestroy();
    spectator.detectChanges();

    expect(unsubscribeFn).toHaveBeenCalled();
  });

  it('should take the user to next step of form when Next Step button is clicked', () => {
    const nextStepFn = jest.spyOn(spectator.component, 'nextStep');
    const updateSelectedIndexFn =
      spectator.inject(SelectedIndexService).updateSelectedIndex;
    const nextStepBtn = spectator.query(ButtonComponent);

    nextStepBtn?.onClick.emit({ type: 'click' });
    spectator.detectChanges();

    expect(nextStepFn).toHaveBeenCalled();
    expect(updateSelectedIndexFn).toHaveBeenCalledWith(1);
  });

  it('should take the user back to the previous step when go back button is clicked', () => {
    spectator.component.selectedStepIndex = 1;
    spectator.detectChanges();

    const goBackBtn = spectator.queryAll(ButtonComponent)[0];
    const previousStepFn = jest.spyOn(spectator.component, 'previousStep');
    const updateSelectedIndexFn =
      spectator.inject(SelectedIndexService).updateSelectedIndex;

    goBackBtn.onClick.emit({ type: 'click' });

    expect(previousStepFn).toHaveBeenCalled();
    expect(updateSelectedIndexFn).toHaveBeenCalledWith(0);
  });

  it('should update whether the user wants to pay on a monthly or yearly basis when toggle is clicked', () => {
    spectator.component.selectedStepIndex = 1;
    spectator.detectChanges();

    const checkbox = spectator.query(MatCheckbox);
    const updateYearlyPaymentFn = jest.spyOn(
      spectator.component,
      'updateYearlyPayment'
    );
    let yearly: boolean | undefined;

    checkbox?.change.emit({ checked: true, source: MatCheckbox.prototype });
    spectator.detectChanges();
    yearly = spectator.component.yearlyPayment;

    expect(updateYearlyPaymentFn).toHaveBeenCalled();
    expect(yearly).toBe(true);
  });

  it('should update which plan the user wants to choose when a cardRadio gets clicked', () => {
    spectator.component.selectedStepIndex = 1;
    spectator.detectChanges();

    const radioGroup = spectator.query(MatRadioGroup);
    const updatePlanFn = jest.spyOn(spectator.component, 'updatePlan');
    let plan: string | undefined;

    radioGroup?.change.emit({
      value: 'Advanced',
      source: MatRadioButton.prototype,
    });
    spectator.detectChanges();
    plan = spectator.component.plan;

    expect(updatePlanFn).toHaveBeenCalled();
    expect(plan).toBe('Advanced');
  });

  it('should update the addOns property when the user selects an addon for the cart', () => {
    spectator.component.selectedStepIndex = 2;
    spectator.detectChanges();

    const firstAddOnCheckbox = spectator.query(MatCheckbox);
    const updateAddOnsFn = jest.spyOn(spectator.component, 'updateAddOns');
    let addOns: AddOn[] | undefined;

    firstAddOnCheckbox?.change.emit({
      checked: true,
      source: MatCheckbox.prototype,
    });
    addOns = spectator.component.addOns;

    expect(updateAddOnsFn).toHaveBeenCalledWith(
      { checked: true, source: MatCheckbox.prototype },
      'online'
    );
    expect(addOns[0].added).toBe(true);
  });

  it('should refuse to submit form when the form is invalid', () => {
    spectator.component.selectedStepIndex = 3;
    spectator.detectChanges();

    const submitFormBtn = spectator.queryLast(ButtonComponent);
    const submitFormFn = jest.spyOn(spectator.component, 'submitForm');
    const findInvalidControlsFn = jest.spyOn(
      spectator.component,
      'findInvalidControls'
    );
    const openDialogFn = jest.spyOn(spectator.component, 'openDialog');
    const openFn = spectator.inject(MatDialog).open;

    submitFormBtn?.onClick.emit({ type: 'click' });

    expect(submitFormFn).toHaveBeenCalled();
    expect(findInvalidControlsFn).toHaveBeenCalledWith(
      spectator.component.stepperForm.get('info')
    );
    expect(findInvalidControlsFn).toHaveLastReturnedWith([
      'name',
      'email',
      'phone',
    ]);
    expect(openDialogFn).toHaveBeenCalledWith(['name', 'email', 'phone']);
    expect(openFn).toHaveBeenCalledWith(InvalidDialogComponent, {
      data: { invalid: ['name', 'email', 'phone'] },
    });
  });

  it('should submit the form when then form is valid', () => {
    spectator = createComponent({
      props: {
        stepperForm: new FormGroup({
          info: new FormGroup({
            // the name, email and phone fields have been replaced to be valid
            name: new FormControl('Stephen King', [
              Validators.required,
              Validators.pattern('^[a-zA-Z]{2,40}(?: +[a-zA-Z]{2,40})+$'),
              Validators.maxLength(60),
            ]),
            email: new FormControl('stephenking@lorem.com', [
              Validators.email,
              Validators.required,
              Validators.maxLength(60),
            ]),
            phone: new FormControl('12345678901', [
              Validators.required,
              Validators.pattern('[0-9 ]{11}'),
            ]),
          }),
          plans: new FormGroup({
            plan: new FormControl('Arcade'),
            yearly: new FormControl(false),
          }),
          addOns: new FormGroup({
            online: new FormControl(false),
            storage: new FormControl(false),
            customisableProfile: new FormControl(false),
          }),
        }),
      },
    });
    spectator.component.selectedStepIndex = 3;
    spectator.detectChanges();

    const submitFormBtn = spectator.queryLast(ButtonComponent);
    const submitFormFn = jest.spyOn(spectator.component, 'submitForm');
    const signUpCustomerFn =
      spectator.inject(PostFormDataService).signUpCustomer;
    const updateShowSummaryStatusFn =
      spectator.inject(ShowSummaryService).updateShowSummaryStatus;
    const resetFn = jest.spyOn(spectator.component.stepperForm, 'reset');
    const resetAddOnsFn = jest.spyOn(spectator.component, 'resetAddOns');

    submitFormBtn?.onClick.emit({ type: 'click' });

    expect(submitFormFn).toHaveBeenCalled();
    expect(signUpCustomerFn).toHaveBeenCalledWith({
      info: {
        name: 'Stephen King',
        email: 'stephenking@lorem.com',
        phone: '12345678901',
      },
      plans: { plan: 'Arcade', yearly: false },
      addOns: { online: false, storage: false, customisableProfile: false },
    });
    expect(updateShowSummaryStatusFn).toHaveBeenCalledWith(false);
    expect(resetFn).toHaveBeenCalledWith({
      info: {
        name: '',
        email: '',
        phone: '',
      },
      plans: {
        plan: 'Arcade',
        yearly: false,
      },
      addOns: {
        online: false,
        storage: false,
        customisableProfile: false,
      },
    });

    expect(resetAddOnsFn).toHaveBeenCalled();
  });
});
