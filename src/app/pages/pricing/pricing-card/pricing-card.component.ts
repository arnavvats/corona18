import { Component, OnInit, Input, ElementRef, AfterContentChecked } from '@angular/core';

@Component({
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss']
})
export class PricingCardComponent implements OnInit, AfterContentChecked {
  @Input() pack;
  constructor(public el: ElementRef) { }

  ngOnInit() {
  }
  ngAfterContentChecked() {
  }

}
