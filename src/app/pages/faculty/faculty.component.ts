import { Component, OnInit } from '@angular/core';
import { staticFacultyDetail } from '../our-team/our-team.model';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
  teamDetail: Array<{
    name: string,
    post: string,
    localImageURL: string
    }> = staticFacultyDetail;
  constructor() { }
  imageStyle(localImageURL) {
    return {
      'height': '200px',
      'width': '200px',
      'background-image':  `url('../../../assets/images/our-team/${localImageURL}')`
    };
  }
  ngOnInit() {
  }

}
