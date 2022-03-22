import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { SearchCardComponent } from './search/search-card/search-card.component';
import { CardStatisticComponent } from './search/search-card/card-statistic/card-statistic.component';
import { SearchFieldComponent } from './header/search-field/search-field.component';
import { UserInfoComponent } from './header/user-info/user-info.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, SearchComponent, FilterComponent, SearchCardComponent, CardStatisticComponent, SearchFieldComponent, UserInfoComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
