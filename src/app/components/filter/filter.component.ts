import { Component, EventEmitter, Output } from '@angular/core';
import { ArrowState, FilterEvent, SortFields } from 'src/app/models/types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() filterByField: EventEmitter<FilterEvent> = new EventEmitter();
  @Output() filterByWord: EventEmitter<string> = new EventEmitter();
  viewState: ArrowState = {
    show: false,
    up: false,
  };
  dateState: ArrowState = {
    show: false,
    up: false,
  };
  inputWord = '';
  isOpen = false;

  sortByField(fieldName: string): void {
    if (fieldName === SortFields.DATE) {
      this.dateState.show = true;
      this.dateState.up = !this.dateState.up;
      this.viewState.show = false;
      this.filterByField.emit({
        direction: this.dateState.up,
        field: fieldName,
      });
    } else {
      this.viewState.show = true;
      this.viewState.up = !this.viewState.up;
      this.dateState.show = false;
      this.filterByField.emit({
        direction: this.viewState.up,
        field: fieldName,
      });
    }
  }

  sortByWord(event: Event): void {
    this.dateState.show = false;
    this.viewState.show = false;
    this.inputWord = (<HTMLInputElement>event.target).value;
    this.filterByWord.emit(this.inputWord);
  }

  toggleFilter() {
    this.isOpen = !this.isOpen;
  }
}
