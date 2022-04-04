import { Component, OnInit } from '@angular/core';
import { ISearchResponse } from 'src/app/youtube/models/search.model';
import { FilterByWordPipe } from 'src/app/youtube/pipes/filterByWord.pipe';
import { SortByFieldPipe } from 'src/app/youtube/pipes/sortByField.pipe';
import { YoutubeService } from '../../services/youtube.service';

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

  constructor(
    private sortByFieldPipe: SortByFieldPipe,
    private filterByWordPipe: FilterByWordPipe,
    private youtubeService: YoutubeService,
  ) {}

  public async ngOnInit(): Promise<void> {
    await this.youtubeService.getResponse();
    this.searchResults = this.youtubeService.response;
    this.setOriginalResponse();
  }

  private setOriginalResponse(): void {
    this.filteredResponse = { ...this.searchResults };
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
}
