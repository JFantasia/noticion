import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

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
   public title;
   public description;
   public image;
   public author;
   public pubDate;
   link;
  @Output() resultado: any = new EventEmitter();


  /* showObj = {
    titulo: true,
    descripcion: true,
    imagen: true
  }
 */
  constructor() { }

  ngOnInit() {
  }

  openLinkInBrowser() {
    window.open(this.feed.link);
  }
  guardarNoticia(){

    this.pubDate=this.feed.pubDate;
    this.title=this.feed.title;
    this.author=this.feed.author;
    this.link= this.feed.link;
    this.description=this.feed.description;
    this.resultado.emit({
                         pubDate:this.pubDate,
                         title:this.title,
                         author:this.author,
                         description:this.description,
                         link: this.link})

  }
  /* deboMostrar(elem) {
    return this.showObj[elem];
  }
  
  cambiarVista(elem) {
    this.showObj[elem] = ! this.showObj[elem];
  } */
}
