import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-ambassador',
  templateUrl: './ambassador.component.html',
  styleUrls: ['./ambassador.component.scss']
})
export class AmbassadorComponent implements OnInit {
  rank = 0;
  points = 0;
  referrals = 0;
  rank_ = 300;
  points_ = 800;
  referrals_ = 200;
  get userDetail() {
    return this.userService.userDetail;
  }
  constructor(private userService: UserService) {
   }

  ngOnInit() {
    let min = Math.min(this.rank_,this.points_,this.referrals_);
    let rankIncVal = Math.floor(this.rank_ / min);
    let pointsIncVal = Math.floor(this.points_ / min);
    let referralIncVal = Math.floor(this.referrals_ / min);
    let interval = setInterval(() => {
      if(this.rank < this.rank_) {
        if(this.rank + rankIncVal > this.rank_) {
          this.rank = this.rank_;
        }
        else {
          this.rank += rankIncVal;
        }
      }
      if(this.points < this.points_) {
        if(this.points + pointsIncVal > this.points_) {
          this.points = this.points_;
        }
        else {
          this.points += pointsIncVal;
        }
      }
      if(this.referrals < this.referrals_) {
        if(this.referrals + referralIncVal > this.referrals_) {
          this.referrals = this.referrals_;
        }
        else {
          this.referrals += referralIncVal;
        }
      }
      if(this.rank === this.rank_ && this.points === this.points_ && this.referrals === this.referrals_) {
        clearInterval(interval);
      }
    }, 20);
  }

  joinAP() {
    this.userService.joinAmbassadorProgram();
  }
}
