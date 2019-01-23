import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { RegistrationStatusString, EventRegistrationStatus } from '../models/registration.model';
import { TeamParticipant, TeamEvent, SoloEvent } from 'src/app/pages/dashboard/dashboard-analytics.model';

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  constructor(private afdb: AngularFireDatabase, private afStorage: AngularFireStorage, private userService: UserService) {
  }
  getAmbassadorLeaderboard() {
    return this.afdb.object('leaderboard/ambassadors').query.once('value').then(res => {
      return res.val();
    });
  }
  getCollegeNameFromId(id) {
    return this.afdb.database.ref('colleges/' + id).once('value').then(res => res.val() && res.val().name);
  }

  getEventDataFromId(id) {
      return this.afdb.object('events/' + id).query.once('value').then((res) => res.val());
  }

  getEventNameFromId(id) {
    return this.afdb.database.ref('events/' + id + '/name').once('value').then(res => res.val());
  }
  async getRegistrationStatus(eventDetail, uid) {
    const eventType = eventDetail.registrationDetail.type;
    const captainOnly = eventDetail.registrationDetail.captainOnly ? true : false;
    const registrationDetail = eventDetail.registrationDetail ? eventDetail.registrationDetail : false;
    const isRestricted = eventDetail.registrationDetail.restricted ? true : false;
    const userPackages = await this.afdb.database.ref('users/' + uid + '/packages').once('value').
    then(this.success)
    .then(eventPacks => {
      return eventPacks || [];
    });
    const eventPackages = eventDetail.registrationDetail.packages || [];
    if (!registrationDetail) {
      throw new Error('Event not registerable');
    }

    if (registrationDetail.startsAt > Date.now()) {
        return new EventRegistrationStatus({
          status: RegistrationStatusString.EVENT_REGISTRATION_YET_TO_START,
        });
    } else if (registrationDetail.endsAt < Date.now()) {
      return new EventRegistrationStatus({
        status: RegistrationStatusString.EVENT_REGISTRATION_ENDED,
      });
    } else if (registrationDetail.type === 'solo') {
      if (isRestricted && !this.matchPackages(eventPackages, userPackages)) {
        return new EventRegistrationStatus({
          status: RegistrationStatusString.NOT_ENOUGH_PACKAGES
        });
      }
      const registrationStatus = await this.afdb.database.ref('users/' + uid + '/registrations/solo/' + eventDetail.id)
                                        .once('value').then(this.success);
     if (registrationStatus === null) {
       return new EventRegistrationStatus({
         status: RegistrationStatusString.CAN_REGISTER
        });
       } else {
        const registeredAt = await this.afdb.database.ref('registration-mapping/solo/' + eventDetail.id
                                     + '/' + registrationStatus + '/' + uid).once('value').then(this.success);
        if (!registeredAt) {
          throw new Error('Fatal error');
        }
        return new EventRegistrationStatus({
          type: 'solo',
          status: RegistrationStatusString.REGISTERED,
          registeredAt,
          round: registrationStatus
        });
       }
     } else if (eventDetail.registrationDetail.type === 'team') {
       const teamIdAndRound = await this.afdb.database.ref('users/' + uid + '/registrations/team/' + eventDetail.id)
                            .once('value')
                            .then(this.success);
        if (teamIdAndRound === null || Object.keys(teamIdAndRound).length !== 1) {
          if (isRestricted) {
            if (this.matchPackages(userPackages, eventPackages)) {
              return new EventRegistrationStatus({
                status: RegistrationStatusString.CAN_REGISTER
              });
            } else if (captainOnly) {
              return new EventRegistrationStatus({
                status: RegistrationStatusString.CAN_REGISTER_AS_MEMBER_ONLY
              });
            } else {
              return new EventRegistrationStatus({
                status: RegistrationStatusString.NOT_ENOUGH_PACKAGES
              });
            }
            } else {
              return new EventRegistrationStatus({
                status: RegistrationStatusString.CAN_REGISTER
              });
            }
          } else {
          const teamId = Object.keys(teamIdAndRound)[0];
          const round = teamIdAndRound[teamId];
          const teamDetailRef = await this.afdb.database.
          ref('registration-mapping/team/' + eventDetail.id + '/' + round + '/' + teamId + '/')
                          .once('value').then(this.success);
          if (teamDetailRef === null || !teamDetailRef.captain) {
            throw new Error('Unknown error');
          } else {
            const captain = await this.userService.getUserNameFromUid(teamDetailRef.captain);
            let members = [];
            if (teamDetailRef.members) {
             members = await Promise.all(teamDetailRef.members.map(userId => {
              return this.userService.getUserNameFromUid(userId);
            }));
          }
            return new EventRegistrationStatus({
                status: RegistrationStatusString.REGISTERED,
                type: 'team',
                teamDetail: {
                  captain,
                  members,
                  name: teamDetailRef.name,
                },
                teamID: teamId,
                registeredAt: teamDetailRef.registeredAt,
                round
            });
          }
        }
     } else {
       throw new Error('Unknown error occurred');
     }
    }

  async performRegistrationChecks(uid, eventDetail, resgisteringAsCaptain?) {
    let userPackages = await this.afdb.database.ref('users/' + uid + '/packages').once('value').then(this.success);
    const eventPackages = eventDetail.packages;
    const isEventRestricted = eventDetail.restricted;
    const isEventCaptainOnly = eventDetail.captainOnly;
    if (!userPackages) {
      userPackages = [];
    }
    const registrationDetail = eventDetail.registrationDetail;
    if (registrationDetail.type &&
       registrationDetail.type !== 'solo'
        && registrationDetail.type !== 'team') {
      throw new Error('Invalid event type');
    }
    if (registrationDetail.type === 'team' && isEventRestricted) {
        if (isEventCaptainOnly && resgisteringAsCaptain
           && !this.matchPackages(userPackages, eventPackages)) {
            throw new Error('Not enough packages');
        } else if (!this.matchPackages(userPackages, eventPackages)) {
            throw new Error('Not enough packages');
        }
     }
     if (isEventRestricted && !this.matchPackages(userPackages, registrationDetail.packages)) {
        throw new Error('You do\'nt have the packages required.');
    }
     if (registrationDetail.startsAt > Date.now()
                || registrationDetail.endsAt < Date.now()) {
      throw new Error('Registration not available');
    }
  }

  async registerUserAsTeamCaptain(uid, eventDetail, teamName) {

    await this.performRegistrationChecks(uid, eventDetail, true);
    const teamId = Math.random().toString(36).substring(7).toUpperCase();
    const ref = this.afdb.database.ref('registration-mapping/team/' + eventDetail.id + '/0/' + teamId);
    const checkId = await ref.once('value').then(this.success);
    if (checkId !== null) {
      throw new Error('Team ID generation failed, please try again');
    } else {
      const teamDetailRef = {
        captain: uid,
        members: [],
        name: teamName,
        registeredAt: Date.now()
      };
      await ref.set(teamDetailRef);
      await this.afdb.database.ref('users/' + uid + '/registrations/team/' + eventDetail.id + '/' + teamId).set(0);
      const captain = (await this.userService.getUserDetail())['name'];
      return new EventRegistrationStatus({
        status: RegistrationStatusString.REGISTERED,
        round: 0,
        teamID: teamId,
        type: 'team',
        teamDetail: {
          captain,
          members: [],
          name: teamName
        },
        registeredAt: teamDetailRef.registeredAt
        });
    }
  }

  async registerUserAsTeamMember(uid, eventDetail, teamId) {
    await this.performRegistrationChecks(uid, eventDetail, false);
    const ref = this.afdb.database.ref('users/' + uid + '/registrations/team/' + eventDetail.id );
    const checkIfExists = await ref.once('value').then(this.success);
    if (checkIfExists !== null) {
      throw new Error('Already registered for a team');
    }
    let teamDetailRef = await this.afdb.database.
                          ref('/registration-mapping/team/' + eventDetail.id + '/0/' + teamId)
                          .once('value').then(this.success);
    if (teamDetailRef === null) {
      throw new Error('Team not found');
    }
    if (teamDetailRef.members && teamDetailRef.members.length + 1 >= eventDetail.registrationDetail.max) {
      throw new Error('Team is full');
    }
      teamDetailRef = await new Promise((res, rej) => {
        this.afdb.database.ref('/registration-mapping/team/' + eventDetail.id + '/0/' + teamId)
        .transaction(detail => {
          if (detail) {
          if (!detail.members) {
            detail.members = [];
          }
            detail.members.push(uid);
          }

            return detail;
        }, (error, committed, snapshot) => {
          if (error) {
            rej(error);
          }
          console.log(snapshot.val());
          if (committed && snapshot.val() !== null) {
            res(snapshot.val());
          }
        });
      });
    await ref.child(teamId).set(0);
    const captain = await this.userService.getUserNameFromUid(teamDetailRef.captain);
    const members = await Promise.all(teamDetailRef.members.map(memberUid => {
      return this.userService.getUserNameFromUid(memberUid);
    }));
    return new EventRegistrationStatus({
      status: RegistrationStatusString.REGISTERED,
      round: 0,
      type: 'team',
      teamID: teamId,
      teamDetail: {
        captain,
        members,
        name: teamDetailRef.name
      },
      registeredAt: teamDetailRef.registeredAt
    });
  }

  async registerUserAsSolo(uid, eventDetail) {
    const ref = this.afdb.database.ref('users/' + uid + '/registrations/solo/' + eventDetail.id);
    const checkIfExists = await ref.once('value').then(this.success);
    if (checkIfExists !== null) {
      throw new Error('Already registered');
    }
    await this.afdb.database.ref('registration-mapping/solo/' + eventDetail.id + '/0/' + uid).set(Date.now());
    await ref.set(0);
    return new EventRegistrationStatus({
      status: RegistrationStatusString.REGISTERED,
      type: 'solo',
      registeredAt: Date.now(),
      round: 0
    });
  }

  async getSoloAndEventDetail(eventID, round, uid) {
    const eventName = await this.getEventNameFromId(eventID);
    const registeredAt = await this.afdb.database.
    ref('registration-mapping/solo/' + eventID + '/' + round + '/' + uid).once('value').then(this.success);
    return new SoloEvent({
      eventName,
      eventID,
      round,
      registeredAt
    });
  }
  async getTeamAndEventDetail(eventID, round, teamID) {
    const eventName = await this.getEventNameFromId(eventID);
    const teamDetailRef = await this.afdb.database.
                          ref('registration-mapping/team/' + eventID + '/' + round + '/' + teamID)
                          .once('value').then(this.success);
    const captain = await this.getParticipantDetail(teamDetailRef.captain);
    let members = [];
    if (teamDetailRef.members) {
      members = await Promise.all(teamDetailRef.members.map(memberUID => this.getParticipantDetail(memberUID)));
    }
    return new TeamEvent({
      captain,
      members,
      registeredAt: teamDetailRef.registeredAt,
      round,
      teamID,
      eventID,
      eventName,
      teamName: teamDetailRef.name
    });
  }
  async getParticipantDetail(uid) {
    const userDetail = await this.userService.getUserInfo(uid);
    return new TeamParticipant(userDetail);
  }

    getImageURL(eventId, posterId) {
      return this.afStorage.ref('posters/events/' + eventId + '/' + posterId).getDownloadURL();
    }
    success(data) {
      return data.val();
    }
    matchPackages(userPackages, eventPackages) {
      return eventPackages.some((eventPackageId) => {
        return userPackages.some(userPackageId => {
          return eventPackageId === userPackageId;
        });
      });
    }
}
