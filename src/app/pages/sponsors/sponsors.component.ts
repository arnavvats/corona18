import { Component, OnInit, ViewChildren, AfterViewInit, Renderer2, ViewChild, HostListener } from '@angular/core';
import { ListItemDirective } from 'src/app/shared/directives/list-item.directive';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit, AfterViewInit {
  @ViewChild('main') main;
  @ViewChild('top') top;
  @ViewChildren(ListItemDirective) items;
  resizeTimeout ;
  sponsors = [
    {
      name: 'ntpc',
      image: '1.png',
      description: 'Main Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'acc',
      image: '2.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Al-Chef',
      image: '3.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Career-Launcher',
      image: '4.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Dominoes',
      image: '5.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Hero',
      image: '6.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Honda',
      image: '7.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'LIC',
      image: '8.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Coca Cola',
      image: '9.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Power Grid',
      image: '10.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'SBI',
      image: '11.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'Techno Herald',
      image: '12.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    },
    {
      name: 'VLCC',
      image: '13.png',
      description: 'Second Sponsor',
      link: 'https://google.com'
    }
  ];
  @HostListener('window:resize')
    onWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((() => {
          this.alignItems();
        }).bind(this), 500);
    }
  constructor(private renderer: Renderer2) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.alignItems();
    this.sponsors.forEach((sponsor, i) => this.setBackgroundGeneral(i));
  }
  alignItems() {
    console.log('called');
    const screenWidth = this.main.nativeElement.offsetWidth;
    const imagesInEach = Math.floor(screenWidth / 200);
    this.items.forEach((item, i) => {
      const el = item.elem.nativeElement.children[0];
      const imagesInTwo = 2 * imagesInEach - 1;
      let offsetRowNumber = Math.floor((i) / imagesInTwo) * 2;
      let rowNumber;
      if (offsetRowNumber === 0) {
        offsetRowNumber = Math.floor(i / imagesInEach) ? 1 : 0;
      } else if (i - (offsetRowNumber / 2) * imagesInTwo >= imagesInEach) {
        offsetRowNumber++;
      }
      rowNumber = offsetRowNumber;
      const defaultLeftOffset = Math.floor((screenWidth - 205 * imagesInEach) / 2);
      const leftOffSet = rowNumber % 2 ? 102 + defaultLeftOffset : defaultLeftOffset;
      this.renderer.setStyle(el, 'top', (rowNumber * 178) + 'px');
      let x;
      if (!(rowNumber % 2)) {
         x = i - (rowNumber / 2) * imagesInTwo;
      }
      if (rowNumber % 2) {
        x = i - ((rowNumber - 1) / 2) * imagesInTwo - imagesInEach;
      }
      const offSet = (x * 205) + leftOffSet;
      this.renderer.setStyle(el, 'left', offSet + 'px' );
    });
     const increaseHeight = Math.floor(this.top.nativeElement.offsetHeight + 400 + (this.items.length / (imagesInEach - 0.5)) * 178);
     this.renderer.setStyle(this.main.nativeElement, 'height', increaseHeight + 'px');
  }
  setBackgroundHover(index) {
    const el = this.items._results[index].elem.nativeElement.children[0].children[0].children[0];
    this.renderer.setStyle(el, 'background-image',
     `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../../../assets/images/sponsers-logo/` + this.sponsors[index].image + `')`);
  }
  setBackgroundGeneral(index) {
    const el = this.items._results[index].elem.nativeElement.children[0].children[0].children[0];
    this.renderer.setStyle(el, 'background-image', `url('../../../assets/images/sponsers-logo/` + this.sponsors[index].image + `')`);
  }
}
