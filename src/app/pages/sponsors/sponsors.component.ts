import { Component, OnInit, ViewChildren, AfterViewInit, Renderer2, ViewChild } from '@angular/core';
import { ListItemDirective } from 'src/app/shared/directives/list-item.directive';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit, AfterViewInit {
  @ViewChild('main') main;
  @ViewChildren(ListItemDirective) items;
  constructor(private renderer: Renderer2) { }
  ngOnInit() {
  }
  ngAfterViewInit() {
    const screenWidth = this.main.nativeElement.offsetWidth;
    const imagesInEach = Math.floor(screenWidth/200);
    this.items.forEach((item, i) => {
      const el = item.elem.nativeElement.children[0];
      const imagesInTwo = 2*imagesInEach - 1;
      let offsetRowNumber =Math.floor((i)/imagesInTwo)*2;
      let rowNumber;
      if(offsetRowNumber == 0) {
        offsetRowNumber = Math.floor(i/imagesInEach) ? 1 : 0;
      }
      else if(i - (offsetRowNumber/2)*imagesInTwo >= imagesInEach) {
        offsetRowNumber++;
      }
      rowNumber = offsetRowNumber;
      console.log(rowNumber);
      const leftOffSet = rowNumber%2 ? 102 : 0;
      this.renderer.setStyle(el, 'top', (rowNumber*178) + 'px');
      let x;
      if(!(rowNumber%2)) {
         x = i - (rowNumber/2)*imagesInTwo;
      }
      if(rowNumber%2) {
        x = i - ((rowNumber - 1)/2)*imagesInTwo - imagesInEach;
      }
      const offSet = (x * 205) + leftOffSet;
      this.renderer.setStyle(el, 'left', offSet + 'px' );
    });
  }

}
