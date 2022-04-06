import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ProgressService } from 'src/app/core/services/progress.service';
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
  public filteredResponse: ISearchResponse = Object.assign({});
  public nothingFound = false;
  public searchTerm = '';
  public errorMessage = false;
  public isLoading = false;
  private searchResults: ISearchResponse = Object.assign({});
  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private sortByFieldPipe: SortByFieldPipe,
    private filterByWordPipe: FilterByWordPipe,
    private youtubeService: YoutubeService,
    private progressService: ProgressService,
  ) {}

  public ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        pluck('searchValue'),
        switchMap((searchValue: string) => {
          this.searchTerm = searchValue;
          return this.youtubeService.getResponse(searchValue);
        }),
      )
      .subscribe({
        next: (data) => {
          this.searchResults = data;
          this.nothingFound = data.items.length === 0;
          this.setOriginalResponse();
        },
        error: () => {
          this.errorMessage = true;
          throw new Error('Invalid request');
        },
      });
    this.progressService.dataLoading$.subscribe((data) => (this.isLoading = data));
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
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
    this.filteredResponse = { ...this.searchResults };
  }
}
