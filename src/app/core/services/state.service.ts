import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StateService {
  data$: Observable<boolean>;
  private isFilterOpened$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.data$ = this.isFilterOpened$.asObservable();
  }

  updatedDataSelection(data: boolean): void {
    this.isFilterOpened$.next(data);
  }
}
