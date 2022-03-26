import { Pipe, PipeTransform } from '@angular/core';
import { SortFields } from '../constants/constants';
import { ISearchCard } from '../models/search-card.model';

@Pipe({ name: 'sortByField' })
export class SortByFieldPipe implements PipeTransform {
  public transform(items: ISearchCard[], filtered: boolean, field: string): any {
    if (field === SortFields.DATE) {
      if (filtered) {
        return items.sort((a, b) => (a.snippet.publishedAt > b.snippet.publishedAt ? 1 : -1));
      } else {
        return items.sort((a, b) => (a.snippet.publishedAt < b.snippet.publishedAt ? 1 : -1));
      }
    } else {
      if (filtered) {
        return items.sort((a, b) => (+a.statistics.viewCount < +b.statistics.viewCount ? 1 : -1));
      } else {
        return items.sort((a, b) => (+a.statistics.viewCount > +b.statistics.viewCount ? 1 : -1));
      }
    }
  }
}
