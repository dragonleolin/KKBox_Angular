import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { YoutubePageComponent } from './page/youtube-page/youtube-page.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'page' }, /**空白會跳轉到home */

  {
    path: 'page',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'youtubePage',
      }, /**空白會跳轉到home */
      { path: 'home', component: HomeComponent },
      { path: 'youtubePage', component: YoutubePageComponent },
      // { path: 'page', component: PageComponent },
      // { path: 'anther', component: AntherComponent },
      // { path: 'contacts', component: ContactComponent },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  } /**萬用路由:隨便輸入都會到home */,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
