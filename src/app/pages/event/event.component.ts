import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { eventData } from '../../shared/models/event-data.model';
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
  event;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((res) => {
      const eventID = res["id"];
      this.event = this.checkArray(eventData, eventID);
      if(this.event === undefined) {
        this.router.navigateByUrl('');
      }
      else {
        console.log(this.event);
        const finalTimeStamp = this.event.startsAt;
        const selfTimer = this.timer;
        setInterval(() => {
          const distance = (finalTimeStamp - Date.now()) / 1000;
          selfTimer.days = Math.floor(distance / (60 * 60 * 24));
          selfTimer.hours = Math.floor((distance % ( 60 * 60 * 24)) / (60 * 60));
          selfTimer.minutes = Math.floor((distance % (60 * 60)) / (60));
          selfTimer.seconds = Math.floor((distance % (60)));
        }, 1000);
      }
    });
   
  }

  checkArray(array, id) {
    for(let i = 0 ; i < array.length ; i++) {
      if(array[i].id === id) {
        return array[i];
      }
      else if(array[i].children !== undefined) {
        const res = this.checkArray(array[i].children, id);
        if(res !== undefined) {
          return res;
        }
      }
    }
  }
}
