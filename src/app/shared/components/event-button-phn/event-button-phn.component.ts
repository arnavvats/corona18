import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-button-phn',
  templateUrl: './event-button-phn.component.html',
  styleUrls: ['./event-button-phn.component.scss']
})
export class EventButtonPhnComponent implements OnInit {
  @Input()left;
  @Input()imageURL;
  @Input()text;
  @Input()route;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateToRoute() {
    this.router.navigateByUrl('/event-phn/' + this.route);
  }
}
