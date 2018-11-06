import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from './shared/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'corona18';
  @ViewChild('appModalHolder', { read: ViewContainerRef }) modalHolder;
  constructor(private modalService: ModalService) {
    modalService.createNewModalWithData.subscribe(data => {
      if (data) {
        modalService.createModal(this.modalHolder, data);
      }
    });
  }

}
