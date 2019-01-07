import { ModalService } from './../../shared/services/modal.service';
import { PricingService } from './pricing.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList, AfterViewInit, AfterContentChecked } from '@angular/core';
import { PricingCardComponent } from './pricing-card/pricing-card.component';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @ViewChild('pricingRow') pricingRow: ElementRef;
  scrollInterval = null;
  packageList = [];
  central = null;
  @ViewChildren(PricingCardComponent) pricingCards: QueryList<PricingCardComponent>;
  pricingCardsElements: Array<PricingCardComponent> = [];
  constructor(private renderer: Renderer2, private pricingService: PricingService, private modalService: ModalService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {

    this.modalService.activateLoader.next('Getting Packages');
    this.pricingService.getPackages().then(res => {
      this.packageList = res;
      this.central = Math.floor(this.packageList.length / 2);
     this.modalService.activateLoader.next(false);
   });
  }
  ngAfterContentChecked() {
    if (this.pricingCards
      && this.pricingCardsElements.length === 0 && this.pricingCards.length !== 0) {
     this.pricingCardsElements = this.pricingCards.toArray();
      this.setUpPackages();
  }
  }
  setUpPackages() {
    this.pricingCardsElements[1].pack = this.packageList[this.central];
    if (this.central + 1 > this.packageList.length - 1) {
      this.pricingCardsElements[2].pack = this.packageList[0];
    } else {
      this.pricingCardsElements[2].pack = this.packageList[this.central + 1];
    }
    if (this.central - 1 < 0) {
      this.pricingCardsElements[0].pack = this.packageList[this.packageList.length - 1];
    } else {
      this.pricingCardsElements[0].pack = this.packageList[this.central - 1];
    }

  }
  rotateElementsLeft() {
    const pricingEl = this.pricingCardsElements.shift();
    this.pricingCardsElements.push(pricingEl);
    this.pricingCardsElements[1].pack = this.packageList[1];
    if (this.central === this.packageList.length - 1) {
      this.central = 0;
    } else {
      this.central++;
    }
    this.setUpPackages();
  }
  rotateElementsRight() {
    const pricingEl = this.pricingCardsElements.pop();
    this.pricingCardsElements.unshift(pricingEl);
    if (this.central === 0) {
      this.central = this.packageList.length - 1;
    } else {
      this.central--;
    }
    this.setUpPackages();

  }
  scrollLeft() {
    this.leftToRight();
    this.rightToCenter();
    this.centerToLeft();
    this.rotateElementsLeft();
  }
  scrollRight() {
    this.rightToLeft();
    this.leftToCenter();
    this.centerToRight();
    this.rotateElementsRight();
  }
  leftToCenter() {
    const el = this.pricingCardsElements[0].el.nativeElement;
    this.renderer.removeClass(el, 'left');
    this.renderer.addClass(el, 'center');
  }
  centerToRight() {
    const el = this.pricingCardsElements[1].el.nativeElement;
    this.renderer.removeClass(el, 'center');
    this.renderer.addClass(el, 'right');
  }
  rightToLeft() {
    const el = this.pricingCardsElements[2].el.nativeElement;
    this.renderer.removeClass(el, 'right');
    this.renderer.addClass(el, 'left');
  }
  leftToRight() {
    const el = this.pricingCardsElements[0].el.nativeElement;
    this.renderer.removeClass(el, 'left');
    this.renderer.addClass(el, 'right');
  }
  rightToCenter() {
    const el = this.pricingCardsElements[2].el.nativeElement;
    this.renderer.removeClass(el, 'right');
    this.renderer.addClass(el, 'center');
  }
  centerToLeft() {
    const el = this.pricingCardsElements[1].el.nativeElement;
    this.renderer.removeClass(el, 'center');
    this.renderer.addClass(el, 'left');
  }


}
