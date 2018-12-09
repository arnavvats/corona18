import { Component, OnInit } from '@angular/core';
import { CollegeService } from 'src/app/shared/services/college.service';
import { ModalService } from 'src/app/shared/services/modal.service';

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

  constructor(private collegeService: CollegeService, private modalService: ModalService) {
   }

  ngOnInit() {
    this.myStyle = {
      'width': '100%',
      'height': '100%',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0
  };



  this.myParams = {
      particles: {
          number: {
              value: 140,
          },
          color: {
              value: '#000000'
          },
          shape: {
              type: 'circle',
          },
          line_linked: {
            color: '#5c4747',
            width: 2
          }
      }
    };

    this.collegeService.getEventDataFromId('fest').then(res => {
      this.events = res;
    });
  }

}
