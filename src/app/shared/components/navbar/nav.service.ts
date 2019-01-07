import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class NavService {
  sidebarClosed$ = new BehaviorSubject(true);
  constructor() {

  }
  toggleSidebar() {
    this.sidebarClosed$.next(!this.sidebarClosed$.getValue());
  }
  closeSidebar() {
    this.sidebarClosed$.next(true);
  }
}
