import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  events=[{
    name:"Technical", image:"gears.png",children:[
        {name:"byteWorld", image:"smart-tv.png", children:[
        ]}
    ]
  }, {
    name: "Creative",
    image: "smart-tv-2.png"
  }];
  timer = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  constructor() { }

  ngOnInit() {
    const finalTimeStamp = Date.now() + 86400 * 1000;
    const selfTimer = this.timer;
    setInterval(() => {
      const distance = (finalTimeStamp - Date.now()) / 1000;
      selfTimer.days = Math.floor(distance / (60 * 60 * 24));
      selfTimer.hours = Math.floor((distance % ( 60 * 60 * 24)) / (60 * 60));
      selfTimer.minutes = Math.floor((distance % (60 * 60)) / (60));
      selfTimer.seconds = Math.floor((distance % (60)));
    }, 1000);
  }

}
