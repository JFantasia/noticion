import { Component, OnInit, Input } from '@angular/core';

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

  /* deboMostrar(elem) {
    return this.showObj[elem];
  }

  cambiarVista(elem) {
    this.showObj[elem] = ! this.showObj[elem];
  } */
}
