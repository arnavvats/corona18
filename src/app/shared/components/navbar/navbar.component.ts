import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  get user() {
    return this.auth.user;
  }
  constructor(private auth: AuthService, private modalService: ModalService) { }

  ngOnInit() {
    console.log (this.auth.user);
  }
  async logOut() {
    try {
      await this.auth.logOut();
    } catch (e) {
      this.modalService.createNewModalWithData.next(e);
    }
  }
}
