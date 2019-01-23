import { EventRegistrationStatus } from './../../shared/models/registration.model';
import { Component, OnInit, Renderer2 } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { CollegeService } from 'src/app/shared/services/college.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { RegistrationButtonMessage, RegistrationStatusString } from 'src/app/shared/models/registration.model';
import { FestPackage, FestPackageFactory } from 'src/app/shared/models/package-mapping';
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
  timerMessage;
  event;
  interval;
  eventID;
  expandSubEvents = false;
  expandLinks = false;
  showRounds = false;
  Date = Date;
  canRegister = false;
  wallpaperSrc = null;
  showWallpaper = false;
  registrationState = null;
  user$ = null;
  packagesRequired: Array<FestPackage> = [];
  constructor(private route: ActivatedRoute, private router: Router, private renderer: Renderer2,
    private collegeService: CollegeService, private userSerivce: UserService, private modalService: ModalService) { }

  ngOnInit() {
    this.user$ = this.userSerivce.user$;
    this.modalService.activateLoader.next('Loading Event Info');
    this.route.params.subscribe((res) => {

      this.reset();
       this.eventID = res['id'];
      this.collegeService.getEventDataFromId(this.eventID).then( eventData => {
        this.event = {id: this.eventID, ...eventData};
        if (this.event.registrationDetail) {
          this.canRegister = true;
          this.registrationState = new EventRegistrationStatus();
          this.registrationState.type = this.event.registrationDetail.type;
          if (this.event.registrationDetail.packages) {
            this.packagesRequired = this.event.registrationDetail.packages.map(pack => {
              return FestPackageFactory(pack);
            });
          }
          this.userSerivce.getUserDetail().then((userDetail: any) => {
            if (userDetail) {
             this.checkIfRegistered(userDetail.uid, this.event).then(message => {
               this.registrationState.updateStatus(message);
             });
            }
          });
        }
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
      const timerMessageAndTime = this.getEventTimer();
      if (timerMessageAndTime) {
        const finalTimeStamp = timerMessageAndTime.time;
        this.timerMessage = timerMessageAndTime.timerMessage;
        const selfTimer = this.timer;
        this.interval = setInterval(() => {
          const distance = (finalTimeStamp - Date.now()) / 1000;
          selfTimer.days = Math.floor(distance / (60 * 60 * 24));
          selfTimer.hours = Math.floor((distance % ( 60 * 60 * 24)) / (60 * 60));
          selfTimer.minutes = Math.floor((distance % (60 * 60)) / (60));
          selfTimer.seconds = Math.floor((distance % (60)));
        }, 1000);
      } else {
        this.resetTimer();
      }
    }
  }
  async registerSolo(e) {
    this.modalService.activateLoader.next('Processing registration');
    const uid = (await this.userSerivce.getUserDetail())['uid'];
    if (!uid) {
      throw new Error('Fatal');
    }
    return this.collegeService.registerUserAsSolo(uid, this.event).then(res => {
      this.modalService.activateLoader.next(false);
      this.modalService.createNewSnackbarWithData.next('Successfully registered');
      this.registrationState = res;
    }).catch(err => {
      this.modalService.activateLoader.next(false);
      this.modalService.createNewSnackbarWithData.next(err && err.message);
    });
  }
  async registerAsMember(teamID) {
    this.modalService.activateLoader.next('Processing registration');
    const uid = (await this.userSerivce.getUserDetail())['uid'];
    if (!uid) {
      throw new Error('Fatal');
    }
    return this.collegeService.registerUserAsTeamMember(uid, this.event, teamID).then(res => {
      this.modalService.activateLoader.next(false);
      this.modalService.createNewSnackbarWithData.next('Successfully registered');
      this.registrationState = res;
    }).catch(e => {
      this.modalService.activateLoader.next(false);
      this.modalService.createNewSnackbarWithData.next(e && e.message);
    });
  }
  async registerAsCaptain(teamName) {
    this.modalService.activateLoader.next('Processing registration');
    const uid = (await this.userSerivce.getUserDetail())['uid'];
    if (!uid) {
      throw new Error('Fatal');
    }
    return this.collegeService.registerUserAsTeamCaptain(uid, this.event, teamName).then(res => {
      this.modalService.activateLoader.next(false);
      this.modalService.createNewSnackbarWithData.next('Successfully registered');
      this.registrationState = res;
    }).catch(e => {
      this.modalService.activateLoader.next(false);
      this.modalService.createNewSnackbarWithData.next(e && e.message);
    });
  }
  checkIfRegistered(uid, eventDetail) {
    return this.collegeService.getRegistrationStatus(eventDetail, uid);
  }

  setBackGround(posterId) {
    if (posterId) {
        const sub = this.collegeService.getImageURL(this.eventID, posterId).subscribe(url => {
          this.wallpaperSrc = url;
          sub.unsubscribe();
        });
    } else {
      this.wallpaperSrc = null;
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
    this.resetTimer();
    this.canRegister = false;
    this.registrationState = null;
    this.packagesRequired = [];
  }
  resetTimer() {
    this.timerMessage = 'Loading';
    this.timer.days = this.timer.hours = this.timer.minutes = this.timer.seconds = 0;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  openRounds() {
    this.showRounds = true;
    window.scrollTo (0, 0);

  }
  getEventTimer() {
    let baseArray = [{
      timerMessage: 'Event starts in',
      time: this.event.startsAt
    }, {
      timerMessage: 'Event ends in',
      time: this.event.endsAt
    }];
    if (this.event.rounds) {
      this.event.rounds.forEach((round, i) => {
        const roundNumber = i + 1;
        baseArray.push({
          timerMessage: 'Round ' + roundNumber + ' starts in',
          time: round.startsAt
        }, {
          timerMessage: 'Round ' + roundNumber + ' ends in',
          time: round.endsAt
        });
      });
    }
    if (this.event.registrationDetail) {
      baseArray.push({
        timerMessage: 'Registrations start in',
        time: this.event.registrationDetail.startsAt
      }, {
        timerMessage: 'Registration ends in',
        time: this.event.registrationDetail.endsAt
      });
    }
    baseArray = baseArray.sort((el1, el2) => {
      return el2.time - el1.time;
    }).filter(el => {
      return el.time > Date.now();
    });
    return baseArray.pop();
  }
}
