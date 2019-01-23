import { Component, ViewChild, ViewContainerRef, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { CollegeService } from './shared/services/college.service';
import { NotificationsService } from './shared/services/notifications.service';
import { NavService } from './shared/components/navbar/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'corona18';
  sidebarClosed = true;
  @ViewChild('appModalHolder', { read: ViewContainerRef }) modalHolder;
  @ViewChild('appSnackbarHolder', { read: ViewContainerRef }) snackbarHolder;
  @ViewChild('contentHolder') contentHolder: ElementRef;
  @ViewChild('appLoaderHolder') appLoaderHolder: ElementRef;

  constructor(private modalService: ModalService, private router: Router
    , private navService: NavService, private notification: NotificationsService,
     private render: Renderer2, private el: ElementRef) {
    modalService.createNewModalWithData.subscribe(data => {
      if (data) {
        modalService.createModal(this.modalHolder, data);
      }
    });
    modalService.createNewSnackbarWithData.subscribe(data => {
      if (data) {
        modalService.createSnackBar(this.snackbarHolder, data);
      }
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  this.navService.sidebarClosed$.subscribe(sidebarClosed => {
    this.sidebarClosed = sidebarClosed;
  });
  }
  ngAfterViewInit() {
    this.modalService.activateLoader.subscribe(val => {
      if (val) {
        this.render.removeStyle(this.appLoaderHolder.nativeElement, 'display');
        this.render.setStyle(this.contentHolder.nativeElement, 'display', 'none');
      } else {
        this.render.setStyle(this.appLoaderHolder.nativeElement, 'display', 'none');
        this.render.setStyle(this.contentHolder.nativeElement, 'display', 'flex');
      }
    });

  }
}
