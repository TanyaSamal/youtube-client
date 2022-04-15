import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { youtubeReducer } from '../redux/reducers/cards.reducers';
import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { CardStatisticComponent } from './components/search/search-card/card-statistic/card-statistic.component';
import { SearchCardComponent } from './components/search/search-card/search-card.component';
import { SearchComponent } from './components/search/search.component';
import { ColorBorderDirective } from './directives/colorBorder.directive';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FilterByWordPipe } from './pipes/filterByWord.pipe';
import { SortByFieldPipe } from './pipes/sortByField.pipe';
import { YoutubeRoutingModule } from './youtube-routing.module';

@NgModule({
  declarations: [
    ColorBorderDirective,
    SortByFieldPipe,
    FilterByWordPipe,
    SearchComponent,
    FilterComponent,
    SearchCardComponent,
    CardStatisticComponent,
    SearchPageComponent,
    DetailPageComponent,
    AdminPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    YoutubeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // StoreModule.forFeature('youtubeCards', youtubeReducer),
  ],
  exports: [DetailPageComponent],
})
export class YoutubeModule {}
