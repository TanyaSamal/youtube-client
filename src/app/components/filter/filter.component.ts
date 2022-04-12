import { Component, EventEmitter, Output } from '@angular/core';
import { ArrowState, FilterEvent, SortFields } from 'src/app/models/types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() filterByFieldClicked: EventEmitter<FilterEvent> = new EventEmitter();
  @Output() filterByWordChanged: EventEmitter<string> = new EventEmitter();
  public viewState: ArrowState = {
    show: false,
    up: false,
  };
  public dateState: ArrowState = {
    show: false,
    up: false,
  };
  public inputWord = '';
  public isOpen = false;
  public sortingByDateContext = { field: 'date', state: this.dateState };
  public sortingByViewsContext = { field: 'views', state: this.viewState };

  public sortByField(fieldName: string): void {
    if (fieldName === SortFields.DATE) {
      this.dateState.show = true;
      this.dateState.up = !this.dateState.up;
      this.viewState.show = false;
      this.filterByFieldClicked.emit({
        direction: this.dateState.up,
        field: fieldName,
      });
    } else {
      this.viewState.show = true;
      this.viewState.up = !this.viewState.up;
      this.dateState.show = false;
      this.filterByFieldClicked.emit({
        direction: this.viewState.up,
        field: fieldName,
      });
    }
  }

  public sortByWord(event: Event): void {
    this.dateState.show = false;
    this.viewState.show = false;
    this.inputWord = (<HTMLInputElement>event.target).value;
    this.filterByWordChanged.emit(this.inputWord);
  }

  public toggleFilter() {
    this.isOpen = !this.isOpen;
  }
}
