import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './core/pages/main-page/main-page.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { DetailPageComponent } from './youtube/pages/detail-page/detail-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'search',
    loadChildren: () => import('./youtube/youtube.module').then((m) => m.YoutubeModule),
  },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: 'card/:id', component: DetailPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
