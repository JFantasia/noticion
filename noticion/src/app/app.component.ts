import { Component, ViewChild } from '@angular/core';
import { FeedService } from './services/feed.service';
import { FeedEntry } from './models/feed-entry';
import { FeedInfo } from './models/feed-info';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /* template: `
  <ul>
      <li *ngFor="let noticia of rss | async">
          <pre>{{ noticia | json }}</pre>
      </li>
  </ul>` */
})
export class AppComponent {
  // @ViewChild(FeedCardComponent, null) hijo: FeedCardComponent;

  filtro: string = "";
  feedUrl: any[] = [];
  feedUrlBD: string [] = [];
  feedUrlKeys: string [] = [];
  feeds: any[] = [];
  keys: string[] = [];
  tituloVisible:boolean = true;
  datosVisible:boolean = true;
  descripcionVisible:boolean = true;
  imageVisible:boolean = true;
  arrayFav:any[];
  array:any[];
  arrayDesfav:any[];
  fav:boolean = false;
  desfav:boolean = false;
  orden: string;
  ascendente:boolean = false;
  descendente:boolean = false;

  rss: Observable<any[]>;
  rssRef:any;

  nombreRSS:string;
  urlRSS:string;


      
  constructor (
    private feedService: FeedService,
    public db: AngularFireDatabase,


  ) {
    this.rssRef = db.list('rss');
  }

  ngOnInit() {
    // this.tituloVisible=true;[];
   
    this.arrayFav=[];
    this.arrayDesfav=[];
    this.array=[];
    this.rssRef.valueChanges().subscribe(
      data => {

        let i=0;
        for (let key in data) {
          this.feedUrl[data[key].nombre] = [data[key].url,1];
        }   

        this.feedUrlBD = this.feedUrl;
        this.feedUrlKeys = Object.keys(this.feedUrl);
        this.refreshFeed();
      }
    );
  }

  /* getClarinCultura() {
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
  } */

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

    //this.feedUrl.forEach((item, index, arr) => {
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
  mostrarTitulo(){
    this.tituloVisible=!this.tituloVisible;
    // this.hijo.cambiarVista("titulo")
  }
  mostrarDatos(){
    this.datosVisible=!this.datosVisible
  }
  
  mostrarImagen(){
    this.imageVisible=!this.imageVisible
    // this.hijo.cambiarVista("imagen")
  }
  mostrarDescripcion(){
    this.descripcionVisible=!this.descripcionVisible
  }
  mostrarFavorables(){
    this.fav=!this.fav;
    if(this.fav&&!this.desfav){
      this.arrayFav=["millones","Evo"]; 
      this.array=this.arrayFav; 
      }
    else if(this.desfav&&this.fav){
      this.arrayDesfav=["precio","renegociar","renuncia"];
      this.arrayFav=["millones","Evo"];
      this.array=this.arrayFav;
      for(let i=0;i< this.arrayDesfav.length; i++){
        this.array.push(this.arrayDesfav[i])
      }
    }
    else if(!this.fav&&this.desfav){
      this.arrayDesfav=["precio","renegociar","renuncia"];
      this.array=this.arrayDesfav;
    }
    else{
      this.array=[];
    }
    
  }
  
  mostrarDesfavorables(){
    this.desfav=!this.desfav;
    if(this.desfav&&!this.fav){
      this.arrayDesfav=["precio","renegociar","renuncia"];
      this.array=this.arrayDesfav;
    }
    else if(this.desfav&&this.fav){
      this.arrayDesfav=["precio","renegociar","renuncia"];
      this.arrayFav=["millones","Evo"];
      this.array=this.arrayFav;
      for(let i=0;i< this.arrayDesfav.length; i++){
        this.array.push(this.arrayDesfav[i])
      }
    }
    else if(!this.desfav&&this.fav){
      this.arrayFav=["millones","Evo"];
      this.array=this.arrayFav;
    }
    else{
      this.array=[];
    }
  }
  mostrarOrdAsc(){
    this.ascendente=!this.ascendente;
    if(this.ascendente && !this.descendente ){
      this.orden="asc";
    }
    else if(this.descendente && this.ascendente){
      this.descendente=!this.descendente;
      this.orden="asc";

    }
    else{
      this.orden="";
    }
  }
  mostrarOrdDesc(){
    this.descendente=!this.descendente;
    if(this.descendente && !this.ascendente ){
      this.orden="desc";
    }
    else if(this.descendente && this.ascendente){
      this.ascendente=!this.ascendente;
      this.orden="desc";
    }
    else{
      this.orden="";
    }
  }

  agregarRSS(){
    let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(this.urlRSS);
    if(valid){
      this.rssRef.push(
        {
          nombre: this.nombreRSS,
          url: this.urlRSS
          
        }
      );
    }
    else{

    }
  }
}
