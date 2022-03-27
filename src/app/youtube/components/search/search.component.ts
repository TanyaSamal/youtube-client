import { Component, OnInit } from '@angular/core';
import { ISearchResponse } from 'src/app/youtube/models/search.model';
import { FilterByWordPipe } from 'src/app/youtube/pipes/filterByWord.pipe';
import { SortByFieldPipe } from 'src/app/youtube/pipes/sortByField.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SortByFieldPipe, FilterByWordPipe],
})
export class SearchComponent implements OnInit {
  searchResults: ISearchResponse = Object.assign({});
  filteredResponse: ISearchResponse = Object.assign({});
  nothingFound = false;
  isShow = false;

  constructor(
    private sortByFieldPipe: SortByFieldPipe,
    private filterByWordPipe: FilterByWordPipe,
  ) {}

  private setOriginalResponse(): void {
    this.filteredResponse = Object.assign({}, this.searchResults);
  }

  async ngOnInit(): Promise<void> {
    const responce = '../../../assets/responce.json';
    const res = await fetch(responce);
    this.searchResults = await res.json();
    this.setOriginalResponse();
  }

  showResults() {
    this.isShow = true;
  }

  filterByField(up: boolean, field: string): void {
    this.sortByFieldPipe.transform(this.filteredResponse.items, up, field);
  }

  filterByWord(word: string): void {
    this.setOriginalResponse();
    this.filteredResponse.items = this.filterByWordPipe.transform(
      this.filteredResponse.items,
      word,
    );
    this.nothingFound = this.filteredResponse.items.length === 0;
  }
}
