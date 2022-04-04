import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent {
  constructor(private router: Router) {}

  public startsearch() {
    this.router.navigate(['/search']);
  }
}
