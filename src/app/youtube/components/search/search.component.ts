import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import { ProgressService } from 'src/app/core/services/progress.service';
import { FilterByWordPipe } from 'src/app/youtube/pipes/filterByWord.pipe';
import { SortByFieldPipe } from 'src/app/youtube/pipes/sortByField.pipe';
import * as CardActions from '../../../redux/actions/cards.actions';
import * as CardSelectors from '../../../redux/selectors/cards.selectors';
import { ICustomCard } from '../../models/custom-card.model';
import { ISearchCard } from '../../models/search-card.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SortByFieldPipe, FilterByWordPipe],
})
export class SearchComponent implements OnInit, OnDestroy {
  public filteredCards: ISearchCard[] = [];
  public nothingFound = false;
  public searchTerm = '';
  public errorMessage = false;
  public isLoading = false;
  public youtubeError$: Observable<Error> = this.store.select(CardSelectors.selectYoutubeError);
  public customResults$: Observable<ICustomCard[]> = this.store.select(
    CardSelectors.selectCustomCards,
  );
  private searchCards: ISearchCard[] = [];
  private youtubeResults$: Observable<ISearchCard[]> = this.store.select(
    CardSelectors.selectYoutubeCards,
  );
  private routerSub = new Subscription();
  private progressSub = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private sortByFieldPipe: SortByFieldPipe,
    private filterByWordPipe: FilterByWordPipe,
    private store: Store,
    private progressService: ProgressService,
  ) {}

  public ngOnInit(): void {
    this.routerSub = this.route.params
      .pipe(
        pluck('searchValue'),
        map((searchValue: string) => {
          if (searchValue) {
            this.searchTerm = searchValue;
            this.store.dispatch(CardActions.getYoutubeCards({ query: searchValue }));
          }
        }),
        switchMap(() =>
          this.youtubeResults$.pipe(
            map((results) => {
              this.searchCards = results;
              this.nothingFound = results.length === 0;
              this.setOriginalResponse();
            }),
          ),
        ),
      )
      .subscribe({
        error: () => {
          this.errorMessage = true;
          throw new Error('Invalid request');
        },
      });
    this.progressSub = this.progressService.dataLoading$.subscribe(
      (data) => (this.isLoading = data),
    );
  }

  public ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
    if (this.progressSub) this.progressSub.unsubscribe();
  }

  public filterByField(up: boolean, field: string): void {
    this.sortByFieldPipe.transform(this.filteredCards, up, field);
  }

  public filterByWord(word: string): void {
    this.setOriginalResponse();
    this.filteredCards = this.filterByWordPipe.transform(this.filteredCards, word);
    this.nothingFound = this.filteredCards.length === 0;
  }

  private setOriginalResponse(): void {
    this.filteredCards = [...this.searchCards];
  }
}
