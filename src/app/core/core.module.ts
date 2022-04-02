import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchFieldComponent } from './components/header/search-field/search-field.component';
import { UserInfoComponent } from './components/header/user-info/user-info.component';
import { AuthGuard } from './gards/auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { StateService } from './services/state.service';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SearchFieldComponent,
    UserInfoComponent,
    NotFoundComponent,
    MainPageComponent,
  ],
  exports: [HeaderComponent, FooterComponent, SearchFieldComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  providers: [StateService, AuthService, AuthGuard],
})
export class CoreModule {}
