import { Pipe, PipeTransform } from '@angular/core';
import { SortFields } from '../../shared/models/types';
import { ISearchCard } from '../models/search-card.model';

@Pipe({ name: 'sortByField' })
export class SortByFieldPipe implements PipeTransform {
  public transform(items: ISearchCard[], filtered: boolean, field: string): any {
    if (field === SortFields.DATE) {
      if (filtered) {
        return items.sort((a, b) =>
          this.compareValue(a.snippet.publishedAt, b.snippet.publishedAt),
        );
      } else {
        return items.sort(
          (a, b) => this.compareValue(a.snippet.publishedAt, b.snippet.publishedAt) * -1,
        );
      }
    } else {
      if (filtered) {
        return items.sort((a, b) =>
          this.compareValue(+a.statistics.viewCount, +b.statistics.viewCount),
        );
      } else {
        return items.sort(
          (a, b) => this.compareValue(+a.statistics.viewCount, +b.statistics.viewCount) * -1,
        );
      }
    }
  }

  private compareValue(value1: string | number, value2: string | number): number {
    return value1 > value2 ? 1 : -1;
  }
}
