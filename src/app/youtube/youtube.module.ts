import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { CardStatisticComponent } from './components/search/search-card/card-statistic/card-statistic.component';
import { SearchCardComponent } from './components/search/search-card/search-card.component';
import { SearchComponent } from './components/search/search.component';
import { ColorBorderDirective } from './directives/colorBorder.directive';
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
  ],
  imports: [CommonModule, SharedModule, YoutubeRoutingModule],
})
export class YoutubeModule {}
