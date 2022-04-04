import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/core/services/state.service';
import { ArrowState, FilterEvent, SortFields } from 'src/app/shared/models/types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Output() filterByField: EventEmitter<FilterEvent> = new EventEmitter();
  @Output() filterByWord: EventEmitter<string> = new EventEmitter();
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
  private sub: Subscription = new Subscription();

  constructor(private stateService: StateService) {}

  public ngOnInit(): void {
    this.sub = this.stateService.data$.subscribe((data) => {
      this.isOpen = data;
    });
  }

  public ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

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

  public sortByWord(event: Event): void {
    this.dateState.show = false;
    this.viewState.show = false;
    this.inputWord = (<HTMLInputElement>event.target).value;
    this.filterByWord.emit(this.inputWord);
  }
}
