import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as CardActions from '../actions/cards.actions';
import { ICardState, ICustomList, IYoutubeList } from '../state.models';

const initialCustomState: ICustomList = {
  cardsList: [],
  error: new Error(),
};

const initialYoutubeState: IYoutubeList = {
  cardsList: [],
  error: new Error(),
};

const customReducer = createReducer(
  initialCustomState,
  on(CardActions.addCustomCard, (state, { card }) => ({
    ...state,
    cardsList: [...state.cardsList, card],
  })),
  on(CardActions.addCustomCardError, (state, { error }) => ({
    ...state,
    error,
  })),
);

const youtubeReducer = createReducer(
  initialYoutubeState,
  on(CardActions.youtubeCardsLoadedSuccess, (state, { cards }) => ({
    ...state,
    cardsList: cards,
  })),
  on(CardActions.youtubeCardsLoadedError, (state, { error }) => ({
    ...state,
    error,
  })),
);

export const reducers: ActionReducerMap<ICardState> = {
  youtubeCards: youtubeReducer,
  customCards: customReducer,
};
