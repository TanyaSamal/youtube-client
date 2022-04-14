import { ICustomCard } from '../youtube/models/custom-card.model';
import { ISearchCard } from '../youtube/models/search-card.model';

export interface ICardState {
  youtubeCards: ISearchCard[];
  customCards: ICustomCard[];
}
