import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import * as CardActions from '../actions/cards.actions';
import { ICardState, ICustomList, IYoutubeList } from '../state.models';

const initialCustomState: ICustomList = {
  cardsList: [],
};

const initialYoutubeState: IYoutubeList = {
  cardsList: [],
};

const customReducer = createReducer(
  initialCustomState,
  on(CardActions.addCustomCard, (state, { card }) => ({
    ...state,
    cardsList: [...state.cardsList, card],
  })),
);

const youtubeReducer = createReducer(
  initialYoutubeState,
  on(CardActions.youtubeCardsLoadedSuccess, (state, { cards }) => ({
    ...state,
    cardsList: cards,
  })),
);

export const reducers: ActionReducerMap<ICardState> = {
  youtubeCards: youtubeReducer,
  customCards: customReducer,
};
