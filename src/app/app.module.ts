import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchFieldComponent } from './components/header/search-field/search-field.component';
import { UserInfoComponent } from './components/header/user-info/user-info.component';
import { CardStatisticComponent } from './components/search/search-card/card-statistic/card-statistic.component';
import { SearchCardComponent } from './components/search/search-card/search-card.component';
import { SearchComponent } from './components/search/search.component';
import { ColorBorderDirective } from './directives/colorBorder.directive';
import { MaterialModule } from './material/material.module';
import { FilterByWordPipe } from './pipes/filterByWord.pipe';
import { SortByFieldPipe } from './pipes/sortByField.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    FilterComponent,
    SearchCardComponent,
    CardStatisticComponent,
    SearchFieldComponent,
    UserInfoComponent,
    ColorBorderDirective,
    SortByFieldPipe,
    FilterByWordPipe,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
