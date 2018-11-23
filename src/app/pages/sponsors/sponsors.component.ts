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
      name: 'NTPC',
      image: '1.png',
      description: 'TITLE SPONSOR',
      link: 'https://www.ntpc.co.in/'
    },
    {
      name: 'ACC',
      image: '2.png',
      description: 'ASSOCIATE SPONSOR',
      link: 'http://www.acclimited.com/'
    },
    {
      name: 'AL-CHEF',
      image: '3.png',
      description: 'FOOD AND BEVERAGE SPONSOR',
      link: 'https://www.zomato.com/patna/al-chef-bakerganj'
    },
    {
      name: 'CAREER-LAUNCHER',
      image: '4.png',
      description: 'EDUCATIONAL PARTNER',
      link: 'https://www.careerlauncher.com/patna/'
    },
    {
      name: 'DOMINOES',
      image: '5.png',
      description: 'FOOD SPONSOR',
      link: 'https://www.dominos.co.in/'
    },
    {
      name: 'HERO',
      image: '6.png',
      description: 'ASSOCIATE SPONSOR',
      link: 'https://auto.ndtv.com/hero-bikes'
    },
    {
      name: 'HONDA',
      image: '7.png',
      description: 'ASSOCIATE SPONSOR',
      link: 'https://www.honda2wheelersindia.com/'
    },
    {
      name: 'LIC',
      image: '8.png',
      description: 'ASSOCIATE SPONSOR',
      link: 'https://www.licindia.in/'
    },
    {
      name: 'COCA COLA',
      image: '9.png',
      description: 'FOOD AND BEVERAGE SPONSOR',
      link: 'http://www.coca-cola.com/global/'
    },
    {
      name: 'POWER GRID',
      image: '10.png',
      description: 'ASSOCIATE SPONSOR',
      link: 'https://www.powergridindia.com/'
    },
    {
      name: 'SBI',
      image: '11.png',
      description: 'ASSOCIATE SPONSOR',
      link: 'https://www.onlinesbi.com/'
    },
    {
      name: 'TECHNO HERALD',
      image: '12.png',
      description: 'EDUCATIONAL PARTNER',
      link: 'https://www.technoherald.com/'
    },
    {
      name: 'VLCC',
      image: '13.png',
      description: 'ASSOCIATE SPONSOR',
      link: 'https://www.vlccpersonalcare.com/'
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
