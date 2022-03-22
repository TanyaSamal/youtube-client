import { ISearchCard } from './search-card/search-card.model';

export interface ISearchResponse {
  kind: string;
  etag: string;
  pageInfo: IPageInfo;
  items: ISearchCard[];
}

interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
