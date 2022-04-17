import { createAction, props } from '@ngrx/store';
import { ICustomCard } from 'src/app/youtube/models/custom-card.model';
import { ISearchCard } from 'src/app/youtube/models/search-card.model';

export const addCustomCard = createAction(
  '[Youtube Page] Add Custom Card',
  props<{ card: ICustomCard }>(),
);
export const addCustomCardError = createAction(
  '[Youtube Page] Add Custom Card Error',
  props<{ error: Error }>(),
);

export const getYoutubeCards = createAction(
  '[Youtube Page] Get Youtube Cards',
  props<{ query: string }>(),
);
export const youtubeCardsLoadedSuccess = createAction(
  '[Youtube API] Youtube Cards Loaded Success',
  props<{ cards: ISearchCard[] }>(),
);
export const youtubeCardsLoadedError = createAction(
  '[Youtube API] Youtube Cards Loaded Error',
  props<{ error: Error }>(),
);
