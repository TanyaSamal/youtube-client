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
