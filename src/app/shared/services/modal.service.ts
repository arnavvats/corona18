import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  createNewModalWithData: BehaviorSubject<string>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.createNewModalWithData = new BehaviorSubject(null);
   }
  createModal(viewContainerRef: ViewContainerRef, data: string) {
    viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.selfRef = componentRef;
    componentRef.instance.data = data;
  }

}
