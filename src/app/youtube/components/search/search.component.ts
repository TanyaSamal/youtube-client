import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
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
export class SearchComponent implements OnInit, OnDestroy {
  searchResults: ISearchResponse = Object.assign({});
  filteredResponse: ISearchResponse = Object.assign({});
  nothingFound = false;
  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private sortByFieldPipe: SortByFieldPipe,
    private filterByWordPipe: FilterByWordPipe,
    private youtubeService: YoutubeService,
  ) {}

  private setOriginalResponse(): void {
    this.filteredResponse = Object.assign({}, this.searchResults);
  }

  public ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        pluck('searchValue'),
        tap((searchValue: string) => {
          this.youtubeService.getResponse(searchValue);
        }),
      )
      .subscribe();
    this.youtubeService.data$.subscribe((data) => {
      this.searchResults = data;
      this.setOriginalResponse();
    });
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

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
