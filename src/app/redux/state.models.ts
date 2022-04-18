import { ICustomCard } from '../youtube/models/custom-card.model';
import { ISearchCard } from '../youtube/models/search-card.model';

export interface ICardState {
  youtubeCards: IYoutubeList;
  customCards: ICustomList;
}

export interface IYoutubeList {
  cardsList: ISearchCard[];
  error: Error | null;
  searchValue: string;
}

export interface ICustomList {
  cardsList: ICustomCard[];
  error: Error | null;
}
