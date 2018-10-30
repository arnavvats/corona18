import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-button',
  templateUrl: './event-button.component.html',
  styleUrls: ['./event-button.component.scss']
})
export class EventButtonComponent implements OnInit {
  @Input()left;
  @Input()imageURL;
  @Input()text;
  @Input()route;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateToRoute() {
    this.router.navigateByUrl('/events/' + this.route);
  }
}
