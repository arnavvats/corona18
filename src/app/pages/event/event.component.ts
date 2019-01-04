import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
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
  expandSubEvents = false;
  expandLinks = false;
  showRounds = false;
  Date = Date;
  canRegister = true;
  @ViewChild('main') main: ElementRef;
  constructor(private route: ActivatedRoute, private router: Router, private renderer: Renderer2,
    private collegeService: CollegeService, private userSerivce: UserService, private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.activateLoader.next('Loading Event Info');
    this.route.params.subscribe((res) => {
      this.reset();
       this.eventID = res['id'];
      this.collegeService.getEventDataFromId(this.eventID).then( eventData => {
        this.event = eventData;
        this.setBackGround(eventData && eventData.posterId);
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

  setBackGround(posterId) {
    if (posterId) {
        const sub = this.collegeService.getImageURL(this.eventID, posterId).subscribe(url => {
          this.renderer.setStyle
      (this.main.nativeElement, 'background-image',
       `linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url("${url}")`);
          sub.unsubscribe();
        });
    } else {
      this.renderer.setStyle
      (this.main.nativeElement, 'background-image',
       // tslint:disable-next-line:max-line-length
       `linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url("../../../assets/images/coronaBackground.jpg")`);
    }
  }
  hideRounds() {
    this.showRounds = false;
    window.scrollTo (0, 0);
  }
  reset() {
    this.event = null;
    this.expandSubEvents = false;
    this.expandLinks = false;
    this.hideRounds();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  openRounds() {
    this.showRounds = true;
    window.scrollTo (0, 0);

  }
}
