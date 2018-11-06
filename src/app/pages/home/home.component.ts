import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events=[{
    name:"Technical", image:"gears.png",children:[
        {name:"byteWorld", image:"smart-tv.png", children:[
        ]}
    ]
  }, {
    name: "Creative",
    image: "smart-tv-2.png"
  }];
  myStyle: object = {};
	myParams: object = {};
	width: number = 100;
	height: number = 100;

  constructor() { }

  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
  };

  this.myParams = {
      particles: {
          number: {
              value: 200,
          },
          color: {
              value: '#ff0000'
          },
          shape: {
              type: 'triangle',
          },
      }
    };
  }

}
