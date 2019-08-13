import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedCardComponent } from './component/feed-card/feed-card.component';
import { FeedService } from './services/feed.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { FeedListComponent } from './component/feed-list/feed-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedCardComponent,
    FilterPipe,
    FeedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpModule,
    FormsModule
  ],
  providers: [FeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
