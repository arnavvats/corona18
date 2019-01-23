import { FestPackage } from './../../shared/models/package-mapping';
import {  FestPackageFactory } from 'src/app/shared/models/package-mapping';

export class DashboardAnalytics {
  teamEvents: Array<TeamEvent> = [];
  soloEvents: Array<SoloEvent> = [];
  packs: Array<FestPackage> = [];
  constructor(data) {
    if (data && data.soloEvents && data.soloEvents.length > 0) {
      this.soloEvents = data.soloEvents.map(soloEvent => {
        return new SoloEvent(soloEvent);
      });
    }
    if (data && data.teamEvents && data.teamEvents.length > 0) {
      this.teamEvents = data.teamEvents.map(teamEvent => {
        return new TeamEvent(teamEvent);
      });
    }
    if (data && data.packs) {
      this.packs = data.packs.map(pack => {
        return  FestPackageFactory(pack);
      });
    }
  }
  get registrationActivity(): Map<string, number> {
    const teamRegistrationDates = this.teamEvents.map((teamEvent) => formatDateFromTimestamp(teamEvent.registeredAt));
    const soloRegistrationDates = this.soloEvents.map((soloEvent) => formatDateFromTimestamp(soloEvent.registeredAt));
    const activity = new Map<string, number>();
    teamRegistrationDates.forEach((formattedDate) => {
      if (!activity.has(formattedDate)) {
        activity.set(formattedDate, 0);
      }
      const countValue = activity.get(formattedDate);
      activity.set(formattedDate, countValue + 1);
    });
    soloRegistrationDates.forEach((formattedDate) => {
      if (!activity.has(formattedDate)) {
        activity.set(formattedDate, 0);
      }
      const countValue = activity.get(formattedDate);
      activity.set(formattedDate, countValue + 1);
    });
    return activity;
  }

  get roundsCount(): Map<number | string, number> {
    const roundsData = new Map<number | string, number>();
    this.teamEvents.forEach(teamEvent => {
      if (!roundsData.has(teamEvent.round)) {
        roundsData.set(teamEvent.round, 0);
      }
      const countValue = roundsData.get(teamEvent.round);
      roundsData.set(teamEvent.round , countValue + 1);
    });
    this.soloEvents.forEach(soloEvent => {
      if (!roundsData.has(soloEvent.round)) {
        roundsData.set(soloEvent.round, 0);
      }
      const countValue = roundsData.get(soloEvent.round);
      roundsData.set(soloEvent.round, countValue + 1);
    });
    if (roundsData.has('winner')) {
      roundsData.set('winner', roundsData.get('winner'));
    }
    return roundsData;
  }
  get teamRegistrationsCount() {
    return this.teamEvents.length;
  }
  get soloRegistrationsCount() {
    return this.soloEvents.length;
  }
  get packageCount() {
    return this.packs.length;
  }
}
export class SoloEvent {
  eventName: string;
  round: number | string;
  eventID: string;
  registeredAt: number;
  constructor(data) {
    this.eventName = data && data.eventName || null;
    this.round = data && data.round || null;
    this.eventID = data && data.eventID || null;
    this.registeredAt = data && data.registeredAt || null;
  }
}
export class TeamEvent {
  eventName: string;
  eventID: string;
  teamID: string;
  teamName: string;
  round: number | string;
  captain: TeamParticipant;
  registeredAt: number;
  members: Array<TeamParticipant> = [];
  constructor(data) {
    this.eventName = data && data.eventName || null;
    this.eventID = data && data.eventID || null;
    this.teamName = data &&  data.teamName || null;
    this.round = data && data.round || null;
    this.captain = data && data.captain || null;
    this.registeredAt = data && data.registeredAt || null;
    this.teamID = data && data.teamID || null;
    if (data && data.members && data.members.length > 0) {
      this.members = data.members.map(teamParticipant => {
        return new TeamParticipant(teamParticipant);
      });
    }
  }
}
export class TeamParticipant {
  name: string;
  uid: string;
  tcfId: string;
  email: string;
  constructor(data) {
    this.name = data && data.name || null;
    this.uid = data && data.uid || null;
    this.tcfId = data && data.tcfId || null;
    this.email = data && data.email || null;
  }
}

export function formatDateFromTimestamp(timestamp): string {

    const dateFromTimeStamp = new Date(timestamp);
  let day: number | string = dateFromTimeStamp.getDate(),
  month: number | string = dateFromTimeStamp.getMonth() + 1;
  const year: number = dateFromTimeStamp.getFullYear();
  if (day < 10) {
      day = '0' + day;
  }
  if (month < 10) {
  month = '0' + month;
  }
  return day + '/' + month + '/' + year;
}
