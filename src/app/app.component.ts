import { Component, ViewChild } from '@angular/core';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { FilterEvent } from './models/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'youtube-client';

  @ViewChild(SearchComponent) viewSearch: SearchComponent = Object.assign({});
  @ViewChild(FilterComponent) viewFilterh: FilterComponent = Object.assign({});

  filterByField(filterEvent: FilterEvent): void {
    this.viewSearch.filterByField(filterEvent.direction, filterEvent.field);
  }

  filterByWord(word: string): void {
    this.viewSearch.filterByWord(word);
  }

  showResults(): void {
    this.viewSearch.showResults();
  }

  openFilter(): void {
    this.viewFilterh.toggleFilter();
  }
}
