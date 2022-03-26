import { Component, OnInit } from '@angular/core';
import { ISearchResponse } from 'src/app/models/search.model';
import { SortByFieldPipe } from 'src/app/pipes/sortByField.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SortByFieldPipe],
})
export class SearchComponent implements OnInit {
  searchResults: ISearchResponse = Object.assign({});

  constructor(private sortByFieldPipe: SortByFieldPipe) {}

  async ngOnInit(): Promise<void> {
    const responce = '../../../assets/responce.json';
    const res = await fetch(responce);
    this.searchResults = await res.json();
  }

  public filterByField(up: boolean, field: string): void {
    this.sortByFieldPipe.transform(this.searchResults.items, up, field);
  }
}
