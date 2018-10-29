import { Component, OnInit, Input } from '@angular/core';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-event-button',
  templateUrl: './event-button.component.html',
  styleUrls: ['./event-button.component.scss']
})
export class EventButtonComponent implements OnInit {
  @Input()left;
  @Input()imageURL;
  @Input()text;
  constructor() { }

  ngOnInit() {
  }

}
