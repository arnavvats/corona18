export enum RegistrationStatusString {
  CAN_REGISTER = 'Can be registered',
  REGISTERED = 'Registered',
  NOT_ENOUGH_PACKAGES = 'You do not have the packages required',
  EVENT_ALREADY_STARTED = 'Round 1 has already started',
  EVENT_ALREADY_ENDED = 'Round 1 has already ended',
  EVENT_REGISTRATION_ENDED = 'Registration Ended',
  EVENT_REGISTRATION_YET_TO_START = 'Registration Yet To Start',
  CAN_REGISTER_AS_MEMBER_ONLY = 'Register as member only'
}
export function RegistrationButtonMessage(status) {
  let returnMessage = '';
   switch (status) {
     case RegistrationStatusString.EVENT_REGISTRATION_ENDED :
     returnMessage = 'Registration Ended';
     break;
     case RegistrationStatusString.EVENT_REGISTRATION_YET_TO_START:
     returnMessage = 'Registration Yet To Start';
     break;
     case RegistrationStatusString.CAN_REGISTER_AS_MEMBER_ONLY:
     returnMessage = 'Register as Team Member';
     break;
    case RegistrationStatusString.CAN_REGISTER:
      returnMessage = 'Register Here';
      break;
    case RegistrationStatusString.REGISTERED:
      returnMessage = 'Already Registered';
      break;
    case RegistrationStatusString.NOT_ENOUGH_PACKAGES:
      returnMessage = 'Not in subscription';
      break;
    case RegistrationStatusString.EVENT_ALREADY_STARTED:
      returnMessage = 'Event already started';
      break;
    case RegistrationStatusString.EVENT_ALREADY_ENDED:
      returnMessage = 'Event already ended';
  }
  return returnMessage;
}
export class EventRegistrationStatus {
  status;
  round;
  registeredAt;
  teamID;
  teamDetail;
  type;
  constructor(data?) {
   this.updateStatus(data);

  }
  updateStatus(data) {
    this.status = data && data.status || null;
    this.round = data && data.round || 0;
    this.registeredAt = data && data.registeredAt || null;
    this.teamID = data && data.teamID || null;
    this.teamDetail = data && data.teamDetail || null;
    this.type = data && data.type;
  }
  get canRegisterForEvent() {
    return this.canRegisterAsMember || this.canRegisterAsCaptain;
  }
  get canRegisterAsMember() {
     return this.status === RegistrationStatusString.CAN_REGISTER_AS_MEMBER_ONLY
      || this.status === RegistrationStatusString.CAN_REGISTER;
  }
  get canRegisterAsCaptain() {
    return this.status === RegistrationStatusString.CAN_REGISTER;
  }
  get isRegisteredForEvent() {
    if (this.status === RegistrationStatusString.REGISTERED) {
      return true;
    }
    return false;
  }
  get buttonMessage() {
    return RegistrationButtonMessage(this.status);
  }
}
