import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events = [{
    text: 'Technical Events',
    imageURL: 'gears.png',
    route: 'technical-events'
  }, {
    text: 'Cultural Events',
    imageURL: 'microphone-2.png',
    route: 'cultural-events'
  }, {
    text: 'Fun Events',
    imageURL: 'bowling-2.png',
    route: 'fun-events'
  }, {
    text: 'Workshops',
    imageURL: 'packs-2.png',
    route: 'workshops'
  }
  ];
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

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
