import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-event-rounds',
  templateUrl: './event-rounds.component.html',
  styleUrls: ['./event-rounds.component.scss']
})
export class EventRoundsComponent implements OnChanges {
  @Input() rounds;
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }
  activeRound;
  ngOnChanges() {
    if (this.rounds) {
    this.activateRound(0);
    this.rounds.forEach((round) => {
            round.startsAt = new Date(round.startsAt);
            round.endsAt = new Date(round.endsAt);
    });
    }
  }
  close() {
    this.closeEvent.emit(true);
  }
  activateRound(i) {
    this.activeRound = this.rounds[i];
  }

}
