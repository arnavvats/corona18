import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'corona18';
  @ViewChild('appModalHolder', { read: ViewContainerRef }) modalHolder;
  constructor(private modalService: ModalService, private router: Router) {
    modalService.createNewModalWithData.subscribe(data => {
      if (data) {
        modalService.createModal(this.modalHolder, data);
      }
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

}
