import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { ISearchCard } from '../../models/search-card.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit, OnDestroy {
  public isLoaded = false;
  public item: ISearchCard = Object.assign({});
  public imgUrl = '';
  private querySubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();

  constructor(
    private ativatedRoute: ActivatedRoute,
    private router: Router,
    private youtubeService: YoutubeService,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    let cardId = '';
    this.routeSubscription = this.ativatedRoute.params
      .pipe(pluck('id'))
      .subscribe((id) => (cardId = id));
    this.querySubscription = this.ativatedRoute.queryParams
      .pipe(
        pluck('search'),
        switchMap((searchValue: string) => {
          return this.youtubeService.getResponse(searchValue);
        }),
        map(({ items }) => {
          return items.find((elem) => elem.id === cardId);
        }),
      )
      .subscribe((card) => {
        if (card) {
          this.item = { ...card };
          this.isLoaded = true;
          this.imgUrl = this.item.snippet.thumbnails.standard
            ? this.item.snippet.thumbnails.standard.url
            : this.item.snippet.thumbnails.medium.url;
        } else {
          this.router.navigateByUrl('404');
        }
      });
  }

  public ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.querySubscription) this.querySubscription.unsubscribe();
  }

  public goBack(): void {
    this.location.back();
  }
}
