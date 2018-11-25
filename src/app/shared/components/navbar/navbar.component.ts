import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('dropDown') dropDown: ElementRef;
  collapsed = true;
  get user() {
    return this.auth.user;
  }
  constructor(private auth: AuthService, private modalService: ModalService, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    console.log (this.auth.user);
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.renderer.removeClass(this.dropDown.nativeElement, 'show');
      }
    });
  }
  async logOut() {
    try {
      await this.auth.logOut();
    } catch (e) {
      this.modalService.createNewModalWithData.next(e);
    }
  }
  toggleDropDown() {
    if (this.collapsed) {
    this.renderer.addClass(this.dropDown.nativeElement, 'show');
    } else {
      this.renderer.removeClass(this.dropDown.nativeElement, 'show');
    }
    this.collapsed = !this.collapsed;
  }
}
