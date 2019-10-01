import { Component, ViewChild, ViewChildren } from '@angular/core';
import { FeedService } from './services/feed.service';

import { AngularFireDatabase } from '@angular/fire/database';

import { Noticia } from './models/noticia';
import {Md5} from 'ts-md5/dist/md5';
import { Usuario } from './models/usuario';

const md5 = new Md5();

const uuidv3 = require('uuid/v3');

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
  feedUrlBD: string[] = [];
  feedUrlKeys: string[] = [];
  feeds: Noticia[] = [];
  keys: string[] = [];
  tituloVisible: boolean = true;
  datosVisible: boolean = true;
  descripcionVisible: boolean = true;
  imageVisible: boolean = true;
  arrayFav: any[];
  array: any[];
  arrayDesfav: any[];
  fav: boolean = false;
  desfav: boolean = false;
  orden: string;
  ascendente: boolean = false;
  descendente: boolean = false;

  rss: any;
  rssRef: any;
  catRef: any;
  notRef: any;
  userRef: any;


  nombreRSS: string;
  urlRSS: string;
  catRSS: any;

  cat: any;
  categorias: string[];

  arregloNotRef: any;
  noticias: Noticia[] = [];

  nombreUsuarioR: string;
  passwordUsuarioR: string;
  nombreUsuarioL: string;
  passwordUsuarioL: string;

  usuarios:Usuario;
  public session:Usuario;
  catFavUsuario:string[];
  constructor(
    private feedService: FeedService,
    public db: AngularFireDatabase, ) {
    this.rssRef = db.list('rss');
    this.catRef = db.list('categoria');
    this.notRef = db.list('noticias');
    //this.userRef = db.list('usuario');
  }

  ngOnInit() {
    // this.tituloVisible=true;[];
    this.catRef.valueChanges().subscribe(data => {
      this.categorias = data;

    }
    );
    /*this.userRef.valueChanges().subscribe(data => {
      this.usuarios = data;

    }
    );*/
    //console.log('this.catRef.update',this.catRef.update("jahhasggas",{nombre:'pingo'}));

    this.notRef.valueChanges().subscribe(data => {
      this.arregloNotRef = data;

    }
    );
    this.arrayFav = [];
    this.arrayDesfav = [];
    this.array = [];
    this.rssRef.valueChanges().subscribe(
      data => {
        let i = 0;
        for (let cat of data) {
          this.feedUrl[cat.nombre] = [cat.url, cat.aceptable, cat.categoria, 1];
        }
        this.rss = data;

        /* data => {
          console.log(this.rssRef.child('Economía'))
          let i=0;
          for (let key in data) {
            this.feedUrl[data[key].nombre] = [data[key].url,1];
          }  */
        this.feedUrlBD = this.feedUrl;
        this.feedUrlKeys = Object.keys(this.feedUrl);
        this.refreshFeed();
        console.log(this.feedUrlKeys, this.feedUrlKeys.length)

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
    if (e.target.checked) {
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

  refreshURL(feedUrl: string) {
    this.feedService.getFeedContent(feedUrl, this.filtro).subscribe(

      feed => {
        for (let i = 0; i < feed.items.length; i++) {

          let not: Noticia = new Noticia();
          not.author = feed.items[i].author;
          not.description = feed.items[i].description;
          not.image = feed.items[i].enclosure.link;
          not.link = feed.items[i].link;
          not.pubDate = feed.items[i].pubDate;
          not.srcRSS = feedUrl;
          not.title = feed.items[i].title;

          this.noticias.push(not);
        }
        this.feeds = this.feeds.concat(this.noticias);
        //
      },
      error => console.log(error));
  }

  refreshFeed() {
    this.feeds = [];
    // Recorremos todas las fuentes de datos y las que estan activas
    // (check ok) pedimos los items.
    this.feedUrlKeys.forEach(key => {
      if (this.feedUrl[key][3] == 1)
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
  mostrarTitulo() {
    this.tituloVisible = !this.tituloVisible;
    // this.hijo.cambiarVista("titulo")
  }
  mostrarDatos() {
    this.datosVisible = !this.datosVisible;
  }

  mostrarImagen() {
    this.imageVisible = !this.imageVisible;
    // this.hijo.cambiarVista("imagen")
  }
  mostrarDescripcion() {
    this.descripcionVisible = !this.descripcionVisible;
  }
  mostrarFavorables() {
    this.fav = !this.fav;
    if (this.fav && !this.desfav) {
      this.arrayFav = ["millones", "Evo"];
      this.array = this.arrayFav;
    }
    else if (this.desfav && this.fav) {
      this.arrayDesfav = ["precio", "renegociar", "renuncia"];
      this.arrayFav = ["millones", "Evo"];
      this.array = this.arrayFav;
      for (let i = 0; i < this.arrayDesfav.length; i++) {
        this.array.push(this.arrayDesfav[i])
      }
    }
    else if (!this.fav && this.desfav) {
      this.arrayDesfav = ["precio", "renegociar", "renuncia"];
      this.array = this.arrayDesfav;
    }
    else {
      this.array = [];
    }

  }

  mostrarDesfavorables() {
    this.desfav = !this.desfav;
    if (this.desfav && !this.fav) {
      this.arrayDesfav = ["precio", "renegociar", "renuncia"];
      this.array = this.arrayDesfav;
    }
    else if (this.desfav && this.fav) {
      this.arrayDesfav = ["precio", "renegociar", "renuncia"];
      this.arrayFav = ["millones", "Evo"];
      this.array = this.arrayFav;
      for (let i = 0; i < this.arrayDesfav.length; i++) {
        this.array.push(this.arrayDesfav[i])
      }
    }
    else if (!this.desfav && this.fav) {
      this.arrayFav = ["millones", "Evo"];
      this.array = this.arrayFav;
    }
    else {
      this.array = [];
    }
  }
  mostrarOrdAsc() {
    this.ascendente = !this.ascendente;
    if (this.ascendente && !this.descendente) {
      this.orden = "asc";
    }
    else if (this.descendente && this.ascendente) {
      this.descendente = !this.descendente;
      this.orden = "asc";

    }
    else {
      this.orden = "";
    }
  }
  mostrarOrdDesc() {
    this.descendente = !this.descendente;
    if (this.descendente && !this.ascendente) {
      this.orden = "desc";
    }
    else if (this.descendente && this.ascendente) {
      this.ascendente = !this.ascendente;
      this.orden = "desc";
    }
    else {
      this.orden = "";
    }
  }

  agregarRSS() {

    let indice = this.categorias.findIndex(elem => elem['nombre'] === this.catRSS);

    /* let key = this.categorias.findIndex(elem=>{
        return elem['nombre'] = this.catRSS
      }, this);
      console.log(key) */
    let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(this.urlRSS);
    if (valid && (this.nombreRSS && indice)) {
      this.rssRef.push(

        {
          nombre: this.nombreRSS,
          url: this.urlRSS,
          aceptable: false,
          categoria: indice

        }
      );
    }
    else {

    }
  }
  guardarNoticias() {
    //let url = "http://wvw.nacion.com/rss/economia.xml";
    console.log(this.feedUrl['Nación - Economía'][0], this.feedUrl)
    console.log(this.noticias[1].link, this.arregloNotRef[0].link,this.noticias[1].link== this.arregloNotRef[0].link, "thisnotice")
    //console.log('this.catRef.update',this.catRef.update("1",{nombre:'Economíaaa'}));

    this.feedUrlKeys.forEach(element => {
      if (this.feedUrl[element][1] == true) {
        this.noticias.forEach(elem => {
          if (this.feedUrl[element][0] == elem.srcRSS) {
 
            let uuid = uuidv3(elem.link, uuidv3.DNS);
              this.notRef.update(uuid,{
                author: elem.author,
                description: elem.description,
                image: elem.image || '',
                link: elem.link,
                pubDate: elem.pubDate,
                srcRSS: elem.srcRSS,
                title: elem.title
              })
          }

        });

      }


      console.log(element, "rss individual")
    });


   
  }
  agregarFavoritos(data) {
    console.log(data.carpetas)
   // for(let c of data.carpetas)
    
  }
  agregarCarpetas(data){
    this.db.list('usuario/'+this.session.username+'/carpetasFav').push({
      nombre: data.nombre,
    })
    console.log(data)
  }
  registrarUsuario(){
    let existe:boolean;
    let nameUser = this.nombreUsuarioR;

    
      let user = this.db.object('usuario/'+nameUser).valueChanges()
      .subscribe(data =>{
        if(!data){
          //seguir registro
        }
        console.log("asc")
      })
      
    
  }
  loginUsuario(){
    let nameUser = this.nombreUsuarioL;
    
    let existe:boolean;
    let user:any = this.db.object('usuario/'+nameUser).valueChanges()
    .subscribe(data =>{
      user = data;
      console.log('user', user);
      if(user){
        if(user.password==md5.appendStr(this.passwordUsuarioL).end()){
          existe=true;
          console.log("existe")
        }
      }
      if(existe){
        let usuarionuevo:Usuario = new Usuario();
        usuarionuevo.username = user.username;
        usuarionuevo.password = user.password;
        usuarionuevo.favoritos = user.favoritos;
        usuarionuevo.carpetaFav = user.carpetasFav;
        this.session = usuarionuevo;
        console.log(this.session)

      }

    });

    //console.log(user)    
    
      
    
    
  }
  
}
