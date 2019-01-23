import { Component, OnInit } from '@angular/core';
import { staticDevDetail } from '../our-team/our-team.model';

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.scss']
})
export class DevelopersComponent implements OnInit {
  teamDetail: Array<{
    name: string,
    post: string,
    mobile: number,
    email: string,
    localImageURL: string
    }> = staticDevDetail;
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
