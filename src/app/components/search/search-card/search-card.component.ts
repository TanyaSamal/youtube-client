import { Component, Input } from '@angular/core';
import { ISearchCard } from 'src/app/models/search-card.model';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css'],
})
export class SearchCardComponent {
  @Input() public item: ISearchCard = Object.assign({});
}
