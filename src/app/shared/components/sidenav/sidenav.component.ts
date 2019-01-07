import { ModalService } from 'src/app/shared/services/modal.service';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss']
})

export class SidenavComponent {
  coronaDefault = `url('../../../../assets/images/CoronaIcon.png')`;
  profileDefault = `url('../../../../assets/images/profile-placeholder.png')`;
  profilePicture = this.coronaDefault;
  constructor(private auth: AuthService, private modalService: ModalService) {
    this.auth.user$.subscribe(user => {
      if (user && user.photoURL) {
     this.profilePicture = 'url(\'' + user.photoURL + '\')';
      } else if (user) {
        this.profilePicture = this.profileDefault;
      } else {
        this.profilePicture = this.coronaDefault;
      }
   });
  }
  get user() {
    return this.auth.user;
  }
  async logOut() {
    try {
      await this.auth.logOut();
    } catch (e) {
      this.modalService.createNewModalWithData.next(e);
    }
  }
}
