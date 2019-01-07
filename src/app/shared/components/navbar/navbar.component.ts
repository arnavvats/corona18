import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
import { NavService } from './nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // @ViewChild('dropDown') dropDown: ElementRef;
  collapsed = true;
  notificationActive = false;
  numberOfNotifications = 0;
  get user() {
    return this.auth.user;
  }
  constructor(
    private auth: AuthService, private modalService: ModalService,
     private renderer: Renderer2, private router: Router,
     private notificationsService: NotificationsService,
     private navService: NavService
     ) { }

  ngOnInit() {
    console.log (this.auth.user);
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // this.renderer.removeClass(this.dropDown.nativeElement, 'show');
      }
    });
    this.notificationsService.notificationsArray.subscribe(res => {
      this.numberOfNotifications = res.length;
    });
  }
  async logOut() {
    try {
      await this.auth.logOut();
    } catch (e) {
      this.modalService.createNewModalWithData.next(e);
    }
  }
  toggleSidebar() {
    this.navService.toggleSidebar();
  }
  toggleNotification() {
    this.notificationActive = !this.notificationActive;
  }
}
