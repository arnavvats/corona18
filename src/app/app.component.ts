import { Component, ViewChild, ViewContainerRef, Renderer2, ElementRef, AfterViewInit, Host } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { Router, NavigationEnd } from '@angular/router';
import { CollegeService } from './shared/services/college.service';
import { NotificationsService } from './shared/services/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'corona18';
  @ViewChild('appModalHolder', { read: ViewContainerRef }) modalHolder;
  @ViewChild('appSnackbarHolder', { read: ViewContainerRef }) snackbarHolder;
  @ViewChild('contentHolder') contentHolder: ElementRef;
  @ViewChild('appLoaderHolder') appLoaderHolder: ElementRef;
  @ViewChild('video') video: ElementRef;

  constructor(private modalService: ModalService, private router: Router,
     private collegeService: CollegeService, private notificationService: NotificationsService,
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
  }
  ngAfterViewInit() {
    this.modalService.activateLoader.subscribe(val => {
      if (val) {
        this.render.removeClass(this.appLoaderHolder.nativeElement, 'd-none');
        this.render.addClass(this.contentHolder.nativeElement, 'd-none');
      } else {
        this.render.addClass(this.appLoaderHolder.nativeElement, 'd-none');
        this.render.removeClass(this.contentHolder.nativeElement, 'd-none');
      }
    });
    setTimeout(() => {
      this.render.addClass(this.video.nativeElement, 'animated');
      this.render.addClass(this.video.nativeElement, 'fadeOut');
    }, 9000);
    setTimeout(() => {
      console.log(this.render.destroyNode(this.video.nativeElement));
      this.render.removeChild(this.el.nativeElement, this.video.nativeElement);
    }, 10000);
  }

}
