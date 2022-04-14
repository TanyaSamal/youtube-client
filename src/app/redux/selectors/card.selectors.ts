import { createFeatureSelector } from '@ngrx/store';
import { ICardState } from '../state.models';

export const selectCustomCards = createFeatureSelector<ICardState>('customCards');
export const selectYoutubeCards = createFeatureSelector<ICardState>('youtubeCards');
