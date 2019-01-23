import { CollegeService } from './../../shared/services/college.service';
import { UserService } from './../../shared/services/user.service';
import { DashboardAnalytics } from './dashboard-analytics.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private userService: UserService, private collegeService: CollegeService, private afDb: AngularFireDatabase) { }

  async getDashboardAnalytics() {
    const userDetail = <any>(await this.userService.getUserDetail()), packs = userDetail && userDetail.packages;
    let soloEvents = [], teamEvents = [];
    if (!userDetail) {
      throw new Error('Fatal error, User Details not found');
    }
    if (userDetail && userDetail.registrations) {
      if (userDetail.registrations.solo) {
         soloEvents = await this.getAllSoloAnalytics(userDetail.registrations.solo, userDetail.uid);
      }
      if (userDetail.registrations.team) {
         teamEvents = await this.getAllTeamAnalytics(userDetail.registrations.team);
      }
    }
    return new DashboardAnalytics({
      teamEvents, soloEvents, packs
    });
  }
  async getAllSoloAnalytics(soloRegistrationsRef, uid) {
   const soloEventDetailArray =  Object.keys(soloRegistrationsRef).map(eventID => {
      return {
        eventID,
        round: soloRegistrationsRef[eventID],
      };
    });
    const soloEvents = await Promise.all(soloEventDetailArray.map(soloEvent => {
      return this.collegeService.getSoloAndEventDetail(soloEvent.eventID, soloEvent.round, uid);
    }));
    return soloEvents;
  }
  async getAllTeamAnalytics(teamRegistrationsRef) {
    const teamIDEventIDAndRoundArray = Object.keys(teamRegistrationsRef).map(eventID => {
      if (Object.keys(teamRegistrationsRef[eventID]).length > 1) {
        throw new Error('Fatal error. Your team details have conflicts. Please contact Tech Support Asap!!!');
      }
      const teamID = Object.keys( teamRegistrationsRef[eventID])[0];
      const round = teamRegistrationsRef[eventID][teamID];
      return {
        eventID,
        teamID,
        round
      };
    });
    const teamEvents = await Promise.all(teamIDEventIDAndRoundArray.map(teamIDEventIDAndRound => {
      return this.collegeService.
      getTeamAndEventDetail(
        teamIDEventIDAndRound.eventID,
        teamIDEventIDAndRound.round,
        teamIDEventIDAndRound.teamID
        );
    }));
    return teamEvents;
  }
  success(data) {
    return data.val();
  }
}
