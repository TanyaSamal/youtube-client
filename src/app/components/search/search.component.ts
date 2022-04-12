import { Component, OnInit } from '@angular/core';
import { ISearchResponse } from 'src/app/models/search.model';
import { FilterByWordPipe } from 'src/app/pipes/filterByWord.pipe';
import { SortByFieldPipe } from 'src/app/pipes/sortByField.pipe';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SortByFieldPipe, FilterByWordPipe],
})
export class SearchComponent implements OnInit {
  public searchResults: ISearchResponse = Object.assign({});
  public filteredResponse: ISearchResponse = Object.assign({});
  public nothingFound = false;
  public isShow = false;

  constructor(
    private sortByFieldPipe: SortByFieldPipe,
    private filterByWordPipe: FilterByWordPipe,
  ) {}

  async ngOnInit(): Promise<void> {
    const responce = '../../../assets/responce.json';
    const res = await fetch(responce);
    this.searchResults = await res.json();
    this.setOriginalResponse();
  }

  public showResults() {
    this.isShow = true;
  }

  public filterByField(up: boolean, field: string): void {
    this.sortByFieldPipe.transform(this.filteredResponse.items, up, field);
  }

  public filterByWord(word: string): void {
    this.setOriginalResponse();
    this.filteredResponse.items = this.filterByWordPipe.transform(
      this.filteredResponse.items,
      word,
    );
    this.nothingFound = this.filteredResponse.items.length === 0;
  }

  private setOriginalResponse(): void {
    this.filteredResponse = Object.assign({}, this.searchResults);
  }
}
