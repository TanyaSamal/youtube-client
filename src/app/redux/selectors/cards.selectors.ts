import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICustomList, IYoutubeList } from '../state.models';

const CustomCards = createFeatureSelector<ICustomList>('customCards');
const YoutubeCards = createFeatureSelector<IYoutubeList>('youtubeCards');

export const selectCustomCards = createSelector(CustomCards, ({ cardsList }) => cardsList);
export const selectYoutubeCards = createSelector(YoutubeCards, ({ cardsList }) => cardsList);
