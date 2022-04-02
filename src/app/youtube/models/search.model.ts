import { ISearchCard } from './search-card.model';

export interface ISearchResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  regionCode?: string;
  pageInfo?: IPageInfo;
  items: ISearchCard[];
}

interface IPageInfo {
  totalResults: number;
  resultsPerPage: number;
}
