import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isFilterShown = false;
  isSearchPage = false;
  sub: Subscription = new Subscription();

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit() {
    this.sub = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isSearchPage = val.url === '/search';
      }
    });
  }

  showFilter() {
    this.isFilterShown = !this.isFilterShown;
    this.stateService.updatedDataSelection(this.isFilterShown);
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}
