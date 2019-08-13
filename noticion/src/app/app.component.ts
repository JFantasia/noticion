import { Component } from '@angular/core';
import { FeedService } from './services/feed.service';
import { FeedEntry } from './models/feed-entry';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  filtro: string = "";
  feedUrl: any [] = [];
  feedUrlBD: string [] = [];
  feedUrlKeys: string [] = [];
  feeds: any[] = [];
  keys: string[] = [];
  

  constructor (
    private feedService: FeedService
  ) {

  }

  ngOnInit() {

    this.feedUrl['Clarin - El Mundo'] = ['https://www.clarin.com/rss/mundo/',1];
    this.feedUrl['Clarin - Política'] = ['https://www.clarin.com/rss/politica/',1];
    this.feedUrl['Clarin - Sociedad'] = ['https://www.clarin.com/rss/sociedad/',1];
    this.feedUrl['Clarin - Economía'] = ['https://www.clarin.com/rss/economia/',1];
    this.feedUrl['Nación - El Pais'] = ['http://wvw.nacion.com/rss/pais.xml',1];
    this.feedUrl['Nación - El Mundo'] = ['http://wvw.nacion.com/rss/mundo.xml',1];
    this.feedUrl['Nación - Economía'] = ['http://wvw.nacion.com/rss/economia.xml',1];
    this.feedUrlBD = this.feedUrl;
    this.feedUrlKeys = Object.keys(this.feedUrl);
    
    console.log("KEYS: ", this.keys);
    this.refreshFeed();

  }

  getClarinCultura() {
    this.feeds.length = 0;
    // Adds 1s of delay to provide user's feedback.
    this.feedService.getFeedContent(this.feedUrl[0], this.filtro).subscribe(
      feed => this.feeds = feed.items,
      error => console.log(error));
  }

  getClarinPolitica() {
    this.feeds.length = 0;
    // Adds 1s of delay to provide user's feedback.
    this.feedService.getFeedContent(this.feedUrl[1], this.filtro).subscribe(
      feed => this.feeds = feed.items,
      error => console.log(error));
  }

  getNacionUltimaHora() {
    this.feeds.length = 0;
    // Adds 1s of delay to provide user's feedback.
    this.feedService.getFeedContent(this.feedUrl[2], this.filtro).subscribe(
      feed => this.feeds = feed.items,
      error => console.log(error));
  }

  updateRSS(e, item) {
    if(e.target.checked){
      let pos = this.feedUrlKeys.indexOf(item);
      this.feedUrl[item][1] = 1;
      console.log("update OK RSS", item);
    } else {
      let pos = this.feedUrlKeys.indexOf(item);
      this.feedUrl[item][1] = 0;
      console.log("update KO RSS", this.feedUrl);
    }

    this.refreshFeed();
    
  }

  getRSS(url) {
    this.feeds.length = 0;
    // Adds 1s of delay to provide user's feedback.
    this.feedService.getFeedContent(url, this.filtro).subscribe(
      feed => this.feeds = feed.items,
      error => console.log(error));
  }

  refreshURL(item) {
    this.feedService.getFeedContent(item, this.filtro).subscribe(
      feed => {
        this.feeds = this.feeds.concat(feed.items);
      },
      error => console.log(error));
  } 

  refreshFeed() {
    this.feeds = [];

    this.feedUrlKeys.forEach(key => {
      if(this.feedUrl[key][1] == 1)
        this.refreshURL(this.feedUrl[key][0])
    })

    // for(var key in Object.keys(this.feedUrl)) {
    //   this.refreshURL(this.feedUrl[key])
    // }

    // this.feedUrl.forEach((item, index, arr) => {
    //   console.log("XXX ", item, index, arr[index]);
    //   this.refreshURL(arr[index])
    // });

    // this.feedService.getFeedContent(this.feedUrl[0], this.filtro).subscribe(
    //   feed => {
    //     console.log("feed ",feed);
    //     this.feeds = this.feeds.concat(feed.items);
        
    //   },
    //   error => console.log(error));
    
  }
}
