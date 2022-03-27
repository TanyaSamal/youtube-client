import { Component, Input } from '@angular/core';
import { ISearchCard } from 'src/app/youtube/models/search-card.model';

@Component({
  selector: 'app-card-statistic',
  templateUrl: './card-statistic.component.html',
  styleUrls: ['./card-statistic.component.css'],
})
export class CardStatisticComponent {
  @Input() public item: ISearchCard = Object.assign({});
}
