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
          height: '120vh',
          thumbnailsColumns: 6,
          thumbnailsRows: 5,
          imageAnimation: NgxGalleryAnimation.Zoom,
          image: false
      },
      {
        breakpoint: 768,
        width: '100%',
        height: '150vh',
        thumbnailsColumns: 4,
        thumbnailsRows: 8,
        imageAnimation: NgxGalleryAnimation.Zoom
      },
      {
        breakpoint: 576,
        width: '100%',
        height: '180vh',
        thumbnailsColumns: 3,
        thumbnailsRows: 10,
        imageAnimation: NgxGalleryAnimation.Zoom,
      }
  ];
  // this.galleryImages = [
  //   this.generateObject('1.jpg'),
  //   this.generateObject('2.jpg'),
  //   this.generateObject('3.jpg'),
  //   this.generateObject('4.jpg'),
  //   this.generateObject('5.jpg'),
  //   this.generateObject('6.jpg'),
  //   this.generateObject('7.jpg'),
  //   this.generateObject('8.jpg'),
  //   this.generateObject('9.jpg'),
  //   this.generateObject('10.jpg'),
  //   this.generateObject('11.jpg'),

   this.galleryImages=[];
   for(let i=1;i<=29;i++)
   {
     this.galleryImages.push(this.generateObject(i+".jpg"));
   };
  }
  generateObject(base) {
    base = 'assets/images/gallery/' + base;
    return  {
      small: base,
      medium: base,
      big: base,
      description: '',
      label: ''
    };
  }

}
