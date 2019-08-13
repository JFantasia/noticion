import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedListComponent } from './component/feed-list/feed-list.component';


const routes: Routes = [
  { path: 'feeds', component: FeedListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
