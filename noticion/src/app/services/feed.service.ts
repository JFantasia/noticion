import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { Feed } from '../models/feed';
import { map, catchError } from "rxjs/operators"; 

@Injectable()
export class FeedService {

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  constructor(
    private http: Http
  ) { }

  getFeedContent(url: string, filtro: string): Observable<any> {
    console.log(this.rssToJsonServiceBaseUrl + url);
    return this.http.get(this.rssToJsonServiceBaseUrl + url).pipe(
    map(this.extractFeeds),
    catchError(<T>(error: any, result?: T) => {
      console.log("catchError: ", error);
      return of(result as T);
    })
    );


  }

  private extractFeeds(res: Response): Feed {
    let feed = res.json();
    return feed || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
