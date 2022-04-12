import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() search: EventEmitter<void> = new EventEmitter();
  @Output() openFilter: EventEmitter<void> = new EventEmitter();

  public emitSearch() {
    this.search.emit();
  }

  public showFilter() {
    this.openFilter.emit();
  }
}
