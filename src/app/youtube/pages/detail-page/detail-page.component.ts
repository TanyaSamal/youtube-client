import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
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
  private sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private youtubeService: YoutubeService,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    this.sub = this.route.params.pipe(pluck('id')).subscribe((id) => {
      this.item = this.youtubeService.getVideoById(id);
      if (this.item) {
        this.isLoaded = true;
        this.imgUrl = this.item.snippet.thumbnails.standard
          ? this.item.snippet.thumbnails.standard.url
          : this.item.snippet.thumbnails.medium.url;
      }
    });
  }

  public goBack(): void {
    this.location.back();
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
