import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { CollegeService } from 'src/app/shared/services/college.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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
  userDetail;
  get link () {
    return  'http://' + location.host + '/sign-in?ref=' + this.userService.uid;
  }
  get shareMessage() {
    return `Hello, this is ${this.userDetail.name}, ambassador for TCF\'19
    National Institute of Technology, Patna, Please register with my link ${this.link}`;
  }
  constructor(private userService: UserService, private collegeService: CollegeService, private router: Router, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user.uid)
      this.setUserDetail(user.uid);
    });
   }

  ngOnInit() {
    this.getAmbassadorLeaderboard();
  }

  setUserDetail(uid) {
    this.userService.getUserInfo(uid).then(res => {
      this.userDetail = res.val();
    });
  }


  joinAP() {
    this.userService.joinAmbassadorProgram().then(res => {
      this.setUserDetail(this.afAuth.auth.currentUser.uid);
    });
  }
  getAmbassadorLeaderboard() {
     this.collegeService.getAmbassadorLeaderboard().then(res => {
       this.ambassadorLeaders = res;
    });
  }
  navigateToLogin() {
    this.router.navigateByUrl('/sign-in');
  }

}
