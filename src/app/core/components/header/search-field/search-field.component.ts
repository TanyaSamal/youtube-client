import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Constants } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit {
  public searchValue = '';
  public newSearchValue = new Subject<string>();

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.newSearchValue
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
}
