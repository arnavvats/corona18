import { Component, OnInit, Input, ElementRef, AfterContentChecked, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pricing-card',
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss']
})
export class PricingCardComponent implements OnInit, AfterContentChecked {
  @Input() pack;
  constructor(public el: ElementRef) { }
  @Output() purchase = new EventEmitter();
  ngOnInit() {
  }
  ngAfterContentChecked() {
  }

  emitPurchase() {
    this.purchase.emit(null);
  }

}
