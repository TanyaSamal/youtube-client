import { Component, ViewChild } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { FilterEvent } from './constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'youtube-client';

  @ViewChild(SearchComponent) viewSearch: SearchComponent = Object.assign({});

  public filterByField(filterEvent: FilterEvent): void {
    this.viewSearch.filterByField(filterEvent.direction, filterEvent.field);
  }
}
