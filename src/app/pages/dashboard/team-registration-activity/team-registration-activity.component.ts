import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamEvent } from '../dashboard-analytics.model';

@Component({
  selector: 'app-team-registration-activity',
  templateUrl: './team-registration-activity.component.html',
  styleUrls: ['./team-registration-activity.component.scss']
})
export class TeamRegistrationActivityComponent implements OnInit {
  @Input() teams: Array<TeamEvent>;
  @Output() setWatchStateToNull: EventEmitter<null> = new EventEmitter();
  selectedTeam: TeamEvent | null = null;
  constructor() { }

  ngOnInit() {
  }
  setSelectedTeam(e) {
    const teamIndex = e.target.value;
    if (teamIndex !== '') {
      this.selectedTeam = this.teams[teamIndex];
    } else {
      this.selectedTeam = null;
    }
  }
  close() {
    this.setWatchStateToNull.emit();
  }
}
