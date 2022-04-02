import { Pipe, PipeTransform } from '@angular/core';
import { ISearchCard } from '../models/search-card.model';

@Pipe({ name: 'filterByWord' })
export class FilterByWordPipe implements PipeTransform {
  public transform(items: ISearchCard[], word: string): ISearchCard[] {
    return items.filter(
      (item) => item.snippet.title.toLowerCase().indexOf(word.toLowerCase()) !== -1,
    );
  }
}
