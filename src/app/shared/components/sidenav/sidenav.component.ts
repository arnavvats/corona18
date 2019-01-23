import { UserService } from 'src/app/shared/services/user.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../navbar/nav.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss']
})

export class SidenavComponent {
  profilePictureURL;
  displayAboutUs = false;
  constructor(private auth: AuthService, private modalService: ModalService, private router: Router, private navService: NavService) {
    this.auth.getProfilePictureImageURL().subscribe(res => {
      this.profilePictureURL = res;
    });
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        this.navService.closeSidebar();
        this.displayAboutUs = false;
      }
    });
  }
  get user() {
    return this.auth.user;
  }

  toggleAboutUs() {
    this.displayAboutUs = !this.displayAboutUs;
  }
  async logOut() {
    try {
      await this.auth.logOut();
    } catch (e) {
      this.modalService.createNewModalWithData.next(e);
    }
  }
}
