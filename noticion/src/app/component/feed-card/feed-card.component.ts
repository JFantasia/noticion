import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {

  @Input() feed: any;
  @Input() showTitle: boolean;
  @Input() showDescription: boolean;
  @Input() showImage: boolean;
  @Input() showDatos: boolean;
  @Input() user: Usuario;
   public title;
   public description;
   public image;
   public author;
   public pubDate;
   public catFav;
   public carpetaC: string[] ;
   public carpetaNueva;
    arr: any = [];
    public  a = new Set();

   link;
  @Output() resultado: any = new EventEmitter();
  @Output() carpetas: any = new EventEmitter();

  /* showObj = {
    titulo: true,
    descripcion: true,
    imagen: true
  }
 */
  constructor() { 
       

  
  }

  ngOnInit() {
    
      
      //this.carpetaC = Array.from(this.user.carpetaFav);
      console.log(this.user)
         
     
    
  }
  
  agregarCarpeta(){
    this.carpetas.emit({
      nombre: this.carpetaNueva,
    })
    //console.log(this.carpetaNueva);
  }
  seleccionarCarp(carp){
    /* this.arr.forEach(element => {
      if(element==cat){
        this.arr.splice(element)
      }
      else{
        this.arr.push(element)
      }
    }); */
    

    if(this.a.has(carp)){
      this.a.delete(carp);

    }
    else{
      this.a.add(carp);

    }
    
    console.log(this.arr, this.a);
   /*  this.a.forEach( ( ele ) => this.arr.push(ele) );
    console.log(this.arr, this.a);
 */
  }
  openLinkInBrowser() {
    window.open(this.feed.link);
  }
  agregarFavoritos(){

    this.pubDate = this.feed.pubDate;
    this.title = this.feed.title;
    this.author = this.feed.author;
    this.link = this.feed.link;
    this.description=this.feed.description;
    this.a.forEach( ( ele ) => this.arr.push(ele) );
    
    this.resultado.emit({
                         pubDate:this.pubDate,
                         title:this.title,
                         author:this.author,
                         description:this.description,
                         link: this.link,
                         carpetas:this.arr})

  }
  objectKeys(data){
     let key = Object.keys(data);
     return key;
  }
  /* deboMostrar(elem) {
    return this.showObj[elem];
  }
  
  cambiarVista(elem) {
    this.showObj[elem] = ! this.showObj[elem];
  } */
}
