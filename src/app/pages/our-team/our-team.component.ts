import { Component, OnInit } from '@angular/core';
import { staticTeamDetail } from './our-team.model';

@Component({
  selector: 'app-our-team',
  templateUrl: './our-team.component.html',
  styleUrls: ['./our-team.component.scss']
})
export class OurTeamComponent implements OnInit {
  teamDetail: Array<{
    name: string,
    post: string,
    mobile: number,
    localImageURL: string
    }> = staticTeamDetail;
  constructor() { }

  ngOnInit() {
    console.log(this.teamDetail.length);
  }
  imageStyle(localImageURL) {
    return {
      'height': '200px',
      'width': '200px',
      'background-image':  `url('../../../assets/images/our-team/${localImageURL}')`
    };
  }

}
