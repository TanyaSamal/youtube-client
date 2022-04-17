import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Constants } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
  public searchValue = '';
  public newSearchValue$ = new BehaviorSubject<string>('');
  private sub = new Subscription();

  constructor(private router: Router) {}

  public ngOnInit() {
    this.sub = this.newSearchValue$
      .pipe(
        filter((text: string) => text.length >= Constants.MIN_CHARACTERS),
        debounceTime(Constants.DEBOUNCE_TIME),
        distinctUntilChanged(),
        catchError((error) => of(error)),
      )
      .subscribe((searchTerm) => {
        this.router.navigate(['/search', searchTerm]);
      });
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
