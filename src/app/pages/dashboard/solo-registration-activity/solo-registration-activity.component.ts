import { SoloEvent } from 'src/app/pages/dashboard/dashboard-analytics.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-solo-registration-activity',
  templateUrl: './solo-registration-activity.component.html',
  styleUrls: ['./solo-registration-activity.component.scss']
})
export class SoloRegistrationActivityComponent implements OnInit {
  @Input() solos: Array<SoloEvent>;
  @Output() setWatchStateToNull: EventEmitter<null> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  close() {
    this.setWatchStateToNull.emit();
  }

}
