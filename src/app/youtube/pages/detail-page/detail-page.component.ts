import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISearchCard } from '../../models/search-card.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
})
export class DetailPageComponent implements OnInit {
  public isLoaded = false;
  public item: ISearchCard = Object.assign({});

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private youtubeService: YoutubeService,
    private location: Location,
  ) {}

  public async ngOnInit(): Promise<void> {
    const idParam = this.activateRoute.snapshot.params['id'];
    let response = { ...this.youtubeService.response };
    if (Object.keys(response).length == 0) {
      await this.youtubeService.getResponse();
      response = { ...this.youtubeService.response };
    }
    this.item = response.items.find((item) => item.id === idParam)!;
    this.isLoaded = this.item !== undefined;
    if (!this.isLoaded) this.router.navigateByUrl('404');
  }

  public goBack(): void {
    this.location.back();
  }
}
