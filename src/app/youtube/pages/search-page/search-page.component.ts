import { Component, ViewChild } from '@angular/core';
import { FilterEvent } from 'src/app/shared/models/types';
import { FilterComponent } from '../../components/filter/filter.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  @ViewChild(SearchComponent) viewSearch: SearchComponent = Object.assign({});
  @ViewChild(FilterComponent) viewFilterh: FilterComponent = Object.assign({});

  filterByField(filterEvent: FilterEvent): void {
    this.viewSearch.filterByField(filterEvent.direction, filterEvent.field);
  }

  filterByWord(word: string): void {
    this.viewSearch.filterByWord(word);
  }
}
