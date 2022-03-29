import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISearchCard } from '../../models/search-card.model';
import { ISearchResponse } from '../../models/search.model';
import { YoutubeService } from '../../services/youtube.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css'],
  providers: [YoutubeService],
})
export class DetailPageComponent implements OnInit {
  id = '';
  isLoaded = false;
  public item: ISearchCard = Object.assign({});

  constructor(
    private activateRoute: ActivatedRoute,
    private yoyubeService: YoutubeService,
    private location: Location,
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = this.activateRoute.snapshot.params['id'];
    const response: ISearchResponse = await this.yoyubeService.getResponse();
    this.item = response.items.find((item) => item.id === this.id)!;
    this.isLoaded = Object.keys(this.item).length !== 0;
  }

  goBack(): void {
    this.location.back();
  }
}
