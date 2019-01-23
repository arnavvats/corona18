import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { RegistrationCount, roundsCountGraph } from './dashboard-charts.model';
import { FestPackage } from 'src/app/shared/models/package-mapping';
import { TeamEvent, SoloEvent } from './dashboard-analytics.model';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  registrationCount = null;
  roundsCount = null;
  teamRegistrationsCount = null;
  soloRegistrationsCount = null;
  packs: Array<FestPackage> = null;
  teamRegistrations: Array<TeamEvent> = null;
  soloRegistrations: Array<SoloEvent> = null;
  packageCount = 0;
  watchState = null;
  constructor(private dashboardService: DashboardService, private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.activateLoader.next('Loading Dashboard');
    this.dashboardService.getDashboardAnalytics().then(res => {
      this.registrationCount = RegistrationCount(res.registrationActivity);
      this.roundsCount = roundsCountGraph(res.roundsCount);
      this.soloRegistrationsCount = res.soloRegistrationsCount;
      this.soloRegistrations = res.soloEvents;
      this.soloRegistrations.forEach(reg => {
        reg.round = reg.round === 'winner' ? 'Winner' : <number>reg.round + 1;
      });
      this.teamRegistrations = res.teamEvents;
      this.teamRegistrations.forEach(reg => {
        reg.round = reg.round === 'winner' ? 'Winner' : <number>reg.round + 1;
      });
      this.teamRegistrationsCount = res.teamRegistrationsCount;
      this.packs = res.packs;
      this.packageCount = res.packageCount;
      this.modalService.activateLoader.next(false);
    })
    .catch(e => {
      this.modalService.activateLoader.next(false);
      this.modalService.createNewSnackbarWithData.next(e && e.message);
    });
  }
  setWatchStateToTeam() {
    this.watchState = 'team';
    window.scrollTo(0, 0);
  }
  setWatchStateToSolo() {
    this.watchState = 'solo';
    window.scrollTo(0, 0);
  }
  setWatchStateToNull() {
    this.watchState = null;
    window.scrollTo(0, 0);
  }

}
