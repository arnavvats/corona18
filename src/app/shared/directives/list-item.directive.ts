import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'app-list-item'
})
export class ListItemDirective {

  constructor(public elem: ElementRef) { }

}
