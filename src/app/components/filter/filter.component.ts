import { Component, EventEmitter, Output } from '@angular/core';
import { ArrowState, FilterEvent, SortFields } from 'src/app/constants/constants';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  @Output() public filterByField: EventEmitter<FilterEvent> = new EventEmitter();
  viewState: ArrowState = {
    show: false,
    up: false,
  };
  dateState: ArrowState = {
    show: false,
    up: false,
  };

  public sortByField(fieldName: string): void {
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
}
