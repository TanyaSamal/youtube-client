import { createReducer, on } from '@ngrx/store';
import { ICardState } from '../state.models';
import * as CardActions from '../actions/card.actions';

const initialCardState: ICardState = {
  youtubeCards: [],
  customCards: [],
};

export const scoreboardReducer = createReducer(
  initialCardState,
  on(CardActions.addCustomCard, (state, { card }) => ({
    ...state,
    customCards: [...state.customCards, card],
  })),
  on(CardActions.getYoutubeCards, (state) => ({ ...state, youtubeCards: [] })),
  on(CardActions.youtubeCardsLoadedSuccess, (state, { cards }) => ({
    ...state,
    youtubeCards: cards,
  })),
);
