export enum Constants {
  ONE_WEEK = 604800000,
  ONE_MOUNTH = 2678400000,
  BLUE_BORDER = '#2f80ed',
  RED_BORDER = '#ed2f2f',
  GREEN_BORDER = '#19d66e',
}

export enum SortFields {
  DATE = 'date',
  VIEWS = 'views',
}

export type ArrowState = {
  show: boolean;
  up: boolean;
};

export type FilterEvent = {
  direction: boolean;
  field: string;
};
