import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent implements OnInit {
  constructor(private router: Router) {}

  public ngOnInit(): void {
    const searchInput = <HTMLInputElement>document.querySelector('.search-input');
    fromEvent(searchInput, 'input')
      .pipe(
        map((event) => (<HTMLInputElement>event.target).value),
        filter((text: string) => text.length > 3),
        debounceTime(50),
        distinctUntilChanged(),
      )
      .subscribe((searchTerm) => {
        console.log(searchTerm);
        this.router.navigate(['/search', searchTerm]);
      });
  }
}
