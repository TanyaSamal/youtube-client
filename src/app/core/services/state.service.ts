import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StateService {
  public data$: Observable<boolean>;
  private isFilterOpened$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.data$ = this.isFilterOpened$.asObservable();
  }

  public updatedDataSelection(data: boolean): void {
    this.isFilterOpened$.next(data);
  }
}
