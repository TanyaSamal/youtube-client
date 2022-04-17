import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { CONSTANTS } from 'src/app/shared/models/constants';
import * as CardSelectors from '../../../redux/selectors/cards.selectors';
import { ICustomCard } from '../../models/custom-card.model';
import { ISearchCard, IStatistisc } from '../../models/search-card.model';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit, OnDestroy {
  public isLoaded = false;
  public statistic: IStatistisc = {} as IStatistisc;
  public itemData: ICustomCard = {} as ICustomCard;
  public item: ISearchCard | ICustomCard = Object.assign({});
  private customResults$: Observable<ICustomCard[]> = this.store.select(
    CardSelectors.selectCustomCards,
  );
  private youtubeResults$: Observable<ISearchCard[]> = this.store.select(
    CardSelectors.selectYoutubeCards,
  );
  private querySubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    let cardId = '';
    this.routeSubscription = this.activatedRoute.params
      .pipe(pluck('id'))
      .subscribe((id) => (cardId = id));
    this.querySubscription = this.activatedRoute.queryParams
      .pipe(
        pluck('search'),
        switchMap((searchValue: string) => {
          return searchValue === CONSTANTS.CUSTOM_CARD_DETAIL
            ? this.customResults$.pipe(map((cards) => this.findDetailCard(cards, cardId)))
            : this.youtubeResults$.pipe(map((cards) => this.findDetailCard(cards, cardId)));
        }),
      )
      .subscribe({
        error: () => {
          throw new Error('Invalid request');
        },
      });
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }

  public isSearchCard(card: ISearchCard | ICustomCard): card is ISearchCard {
    return 'snippet' in card;
  }

  private getItemData(card: ISearchCard | ICustomCard): void {
    if (this.isSearchCard(card)) {
      this.itemData = {
        title: card.snippet.title,
        date: card.snippet.publishedAt,
        image: card.snippet.thumbnails.standard
          ? card.snippet.thumbnails.standard.url
          : card.snippet.thumbnails.medium.url,
        description: card.snippet.description,
        id: typeof card.id === 'string' ? card.id : card.id.videoId,
        video: '',
      };
      this.statistic = { ...card.statistics };
    } else {
      this.itemData = { ...card };
    }
  }

  private handleResults(card: ISearchCard | ICustomCard | undefined): void {
    if (card) {
      this.item = { ...card };
      this.isLoaded = true;
      this.getItemData(card);
    } else {
      this.router.navigateByUrl('404');
    }
  }

  private findDetailCard(cards: Array<ISearchCard | ICustomCard>, cardId: string): void {
    const detaidCard = cards.find((card) => card.id === cardId);
    this.handleResults(detaidCard);
  }
}
