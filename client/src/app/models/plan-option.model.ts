export interface Price {
  monthly: string;
  yearly: string;
}

export interface PlanOption {
  value: string;
  cardImg: string;
  cardImgAlt: string;
  price: Price;
}
