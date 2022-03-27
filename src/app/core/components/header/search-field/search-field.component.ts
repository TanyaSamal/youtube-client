import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent {
  @Output() search: EventEmitter<void> = new EventEmitter();

  startsearch() {
    this.search.emit();
  }
}
