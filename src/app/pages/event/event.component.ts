import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { eventData } from '../../shared/models/event-data.model';
import { CollegeService } from 'src/app/shared/services/college.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalService } from 'src/app/shared/services/modal.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  timer = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  event;
  interval;
  user;
  eventID;
  Date = Date;
  canRegister = true;
  constructor(private route: ActivatedRoute, private router: Router,
    private collegeService: CollegeService, private userSerivce: UserService, private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.activateLoader.next('Loading Event Info');
    this.route.params.subscribe((res) => {
      this.event = null;
      if (this.interval) {
        clearInterval(this.interval);
      }
      // this.userSerivce.user$.subscribe(user => {
      //   if (user) {
      //     //this.checkIfRegistered();
      //   }
      // });
       this.eventID = res['id'];
      this.collegeService.getEventDataFromId(this.eventID).then( eventData => {
        this.event = eventData;
        this.modalService.activateLoader.next(false);
        this.setEventTimer();
      });
    });
  }
  setEventTimer() {

    if (!this.event) {
      this.router.navigateByUrl('');
    } else {
      console.log(this.event);
      const finalTimeStamp = this.event.startsAt;
      const selfTimer = this.timer;
      this.interval = setInterval(() => {
        const distance = (finalTimeStamp - Date.now()) / 1000;
        selfTimer.days = Math.floor(distance / (60 * 60 * 24));
        selfTimer.hours = Math.floor((distance % ( 60 * 60 * 24)) / (60 * 60));
        selfTimer.minutes = Math.floor((distance % (60 * 60)) / (60));
        selfTimer.seconds = Math.floor((distance % (60)));
      }, 1000);
    }
  }
  async register() {
    if (!this.userSerivce.uid) {
      this.modalService.createNewSnackbarWithData.next('Please Login first');
    } else {
      try {
      await this.collegeService.registUserForEvent(this.userSerivce.uid, this.eventID);
      this.canRegister = false;
      } catch (e) {
        this.modalService.createNewSnackbarWithData.next(e && e.message);
      }
    }
  }
  checkIfRegistered() {
    if (this.userSerivce.uid) {
       this.collegeService.checkIfRegistered(this.userSerivce.uid, this.eventID).then((res) => {
        this.canRegister = !res;
       });
    }
  }
  registerSoon() {
    this.modalService.createNewSnackbarWithData.next('Registrations will start soon!!');
  }
}
