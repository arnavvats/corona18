import { Component, OnInit } from '@angular/core';
import { CollegeService } from 'src/app/shared/services/college.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events;
  myStyle: object = {};
  myParams: object = {};
  width = 100;
  height = 100;

  constructor(private collegeService: CollegeService) {
    collegeService.getEventDataFromId('fest').then(res => {
      this.events = res.data();
    });
   }

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
