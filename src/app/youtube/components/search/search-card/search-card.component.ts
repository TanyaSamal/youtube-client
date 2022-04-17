import { Component, Input, OnInit } from '@angular/core';
import { ICustomCard } from 'src/app/youtube/models/custom-card.model';
import { ISearchCard } from 'src/app/youtube/models/search-card.model';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css'],
})
export class SearchCardComponent implements OnInit {
  @Input() public item: ISearchCard | ICustomCard = Object.assign({});
  @Input() public search = '';
  public itemData: ICustomCard = Object.assign({});

  ngOnInit() {
    if (this.isISearchCard(this.item)) {
      this.itemData.title = this.item.snippet.title;
      this.itemData.date = this.item.snippet.publishedAt;
      this.itemData.image = this.item.snippet.thumbnails.medium.url;
      this.itemData.id = typeof this.item.id === 'string' ? this.item.id : this.item.id.videoId;
    } else {
      this.itemData = { ...this.item };
    }
  }

  private isISearchCard(object: any): object is ISearchCard {
    return 'snippet' in object;
  }
}
