import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchFieldComponent } from './components/header/search-field/search-field.component';
import { UserInfoComponent } from './components/header/user-info/user-info.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchFieldComponent,
    UserInfoComponent,
    NotFoundComponent,
  ],
  exports: [HeaderComponent],
  imports: [CommonModule, SharedModule],
})
export class CoreModule {}
