import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor() { }

  ngOnInit() {
    this.galleryOptions = [
      {
          width: '100%',
          thumbnailsColumns: 6,
          thumbnailsRows: 2,
          imageAnimation: NgxGalleryAnimation.Zoom,
          image: false
      },
      {
        breakpoint: 768,
        width: '100%',
        height: '100vh',
        thumbnailsColumns: 4,
        thumbnailsRows: 3,
        imageAnimation: NgxGalleryAnimation.Zoom
      },
      {
        breakpoint: 576,
        width: '100%',
        height: '100vh',
        thumbnailsColumns: 3,
        thumbnailsRows: 4,
        imageAnimation: NgxGalleryAnimation.Zoom,
      }
  ];
  this.galleryImages = [
    this.generateObject('1.jpeg'),
    this.generateObject('2.jpeg'),
    this.generateObject('3.jpeg'),
    this.generateObject('4.jpeg'),
    this.generateObject('5.jpeg'),
    this.generateObject('6.jpeg'),
    this.generateObject('7.jpeg'),
    this.generateObject('8.jpeg'),
    this.generateObject('9.jpeg'),
    this.generateObject('10.jpeg'),
    this.generateObject('10.jpeg')


];
  }
  generateObject(base) {
    base = 'assets/images/gallery/' + base;
    return  {
      small: base,
      medium: base,
      big: base,
      description: 'dd',
      label: 'dfd'
    };
  }

}
