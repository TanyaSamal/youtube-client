import { Component } from '@angular/core';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isFilterShown = false;

  constructor(private stateService: StateService) {}

  showFilter() {
    this.isFilterShown = !this.isFilterShown;
    this.stateService.updatedDataSelection(this.isFilterShown);
  }
}
