import { EventRegistrationStatus } from './../../../shared/models/registration.model';
import { Component, OnInit, Input, Output, EventEmitter, AfterContentChecked } from '@angular/core';
@Component({
  selector: 'app-solo-registration',
  templateUrl: './solo-registration.component.html',
  styleUrls: ['./solo-registration.component.scss']
})
export class SoloRegistrationComponent implements OnInit, AfterContentChecked {
  @Input() registrationState: EventRegistrationStatus;
  @Output() registerSolo = new EventEmitter();
  styleClass = {

  };
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    if (this.registrationState) {
    }
  }

  submitRegisterSolo() {
    this.registerSolo.emit(null);
  }
}
