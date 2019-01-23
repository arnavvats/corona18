import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventRegistrationStatus } from 'src/app/shared/models/registration.model';

@Component({
  selector: 'app-team-registration',
  templateUrl: 'team-registration.component.html',
  styleUrls: ['team-registration.component.scss'],
})

export class TeamRegistrationComponent implements OnInit {
  teamName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]);
  teamID = new FormControl('', [Validators.required]);
  asCaptain = null;
  @Output() registerAsCaptain = new EventEmitter();
  @Output() registerAsMember = new EventEmitter();
  @Input() registrationState: EventRegistrationStatus;
  registrationDetail;
  constructor() {
   }
  ngOnInit() {
   }
   submitRegistrationAsCaptain() {
    this.registerAsCaptain.emit(this.teamName.value);
   }
   submitRegistrationAsMember() {
    this.registerAsMember.emit(this.teamID.value);
   }
}
