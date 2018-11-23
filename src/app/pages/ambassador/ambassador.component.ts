import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { CollegeService } from 'src/app/shared/services/college.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ambassador',
  templateUrl: './ambassador.component.html',
  styleUrls: ['./ambassador.component.scss']
})
export class AmbassadorComponent implements OnInit {
  rank = 0;
  points = 0;
  referrals = 0;
  ambassadorLeaders;
  get userDetail() {
    return this.userService.userDetail;
  }
  get link () {
    return  location.host + 'sign-in?ref=' + this.userService.uid;
  }
  get shareMessage() {
    return `Hello, this is ${this.userDetail.name}, ambassador for TCF\'19
    National Institute of Technology, Patna, Please register with my link ${this.link}`;
  }
  constructor(private userService: UserService, private collegeService: CollegeService, private router: Router) {
   }

  ngOnInit() {
    this.getAmbassadorLeaderboard();
  }


  joinAP() {
    this.userService.joinAmbassadorProgram();
  }
  getAmbassadorLeaderboard() {
     this.collegeService.getAmbassadorLeaderboard().toPromise().then(res => {
       this.ambassadorLeaders = res;
    });
  }
  navigateToLogin() {
    this.router.navigateByUrl('/sign-in');
  }

}
