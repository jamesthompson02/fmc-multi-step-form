import { Price } from './plan-option.model';

export interface AddOn {
  formControlName: string;
  heading: string;
  subHeading: string;
  price: Price;
}
