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
  public title = 'youtube-client';

  @ViewChild(SearchComponent) viewSearch: SearchComponent = Object.assign({});
  @ViewChild(FilterComponent) viewFilterh: FilterComponent = Object.assign({});

  public filterByField(filterEvent: FilterEvent): void {
    this.viewSearch.filterByField(filterEvent.direction, filterEvent.field);
  }

  public filterByWord(word: string): void {
    this.viewSearch.filterByWord(word);
  }

  public showResults(): void {
    this.viewSearch.showResults();
  }

  public openFilter(): void {
    this.viewFilterh.toggleFilter();
  }
}
