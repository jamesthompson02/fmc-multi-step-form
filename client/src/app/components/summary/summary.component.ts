import { Component, Input, OnInit } from '@angular/core';
import { PlanOption } from '../../models/plan-option.model';
import { AddOn } from '../../models/add-on.model';
import { SelectedIndexService } from '../../services/selectedIndex/selected-index.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  @Input() plan!: string;
  @Input() planOptions!: PlanOption[];
  @Input() addOns!: AddOn[];
  @Input() yearly: boolean = false;

  selectedPlanOption!: PlanOption;

  totalPrice!: string;

  constructor(private selectedIndexService: SelectedIndexService) {}

  ngOnInit(): void {
    const validPlanOption = this.planOptions.find(
      (planOption: PlanOption) => planOption.value === this.plan
    );
    if (validPlanOption) {
      this.selectedPlanOption = validPlanOption;
    }
    this.totalPrice = this.calculateTotalPrice(
      this.yearly,
      this.selectedPlanOption,
      this.addOns
    );
  }

  changePlan() {
    this.selectedIndexService.updateSelectedIndex(1);
  }

  calculateTotalPrice(
    yearly: boolean,
    selectedPlan: PlanOption,
    addOns: AddOn[]
  ) {
    let totalPrice = 0;
    const chosenAddOns = addOns.filter((addOn) => addOn.added);
    const prices = chosenAddOns.map((addOn) => addOn.price);
    prices.push(selectedPlan.price);
    if (yearly) {
      prices.forEach((price) => {
        const parsedInt = this.extractNumberFromString(price.yearly);
        if (parsedInt) totalPrice += +parsedInt;
      });
      return `$${totalPrice}/year`;
    } else {
      prices.forEach((price) => {
        const parsedInt = this.extractNumberFromString(price.monthly);
        if (parsedInt) totalPrice += +parsedInt;
      });
      return `$${totalPrice}/month`;
    }
  }

  extractNumberFromString(numString: string) {
    let numRegEx = numString.match(/\d/g);
    const numInt = numRegEx?.join('');
    return numInt;
  }
}
