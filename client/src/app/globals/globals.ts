import { AddOn } from '../models/add-on.model';
import { PlanOption } from '../models/plan-option.model';

export const subscriptionPlans: PlanOption[] = [
  {
    value: 'Arcade',
    cardImg: 'icon-arcade.svg',
    cardImgAlt: 'Icon of old joystick controller.',
    price: { monthly: '$9/month', yearly: '$90/year' },
  },
  {
    value: 'Advanced',
    cardImg: 'icon-advanced.svg',
    cardImgAlt: 'Icon of  old gamepad controller.',
    price: { monthly: '$12/month', yearly: '$120/year' },
  },
  {
    value: 'Pro',
    cardImg: 'icon-pro.svg',
    cardImgAlt: 'Icon of modern game controller.',
    price: { monthly: '$15/month', yearly: '$150/year' },
  },
];

export const subscriptionAddOns: AddOn[] = [
  {
    formControlName: 'online',
    heading: 'Online service',
    subHeading: 'Access to multiplayer games',
    price: { monthly: '+$1/month', yearly: '+$10/year' },
  },
  {
    formControlName: 'storage',
    heading: 'Larger storage',
    subHeading: 'Extra 1TB of cloud save',
    price: { monthly: '+$2/month', yearly: '+$20/year' },
  },
  {
    formControlName: 'customisableProfile',
    heading: 'Customisable profile',
    subHeading: 'Custom theme on your profile',
    price: { monthly: '+$2/month', yearly: '+$20/year' },
  },
];
