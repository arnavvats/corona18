import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import {ModalComponent} from '../components/modal/modal.component';
import { BehaviorSubject } from 'rxjs';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { Component } from '@angular/compiler/src/core';
import { LoaderComponent } from '../components/loader/loader.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  createNewModalWithData: BehaviorSubject<string>;
  createNewSnackbarWithData: BehaviorSubject<string>;
  activateLoader: BehaviorSubject<string | Boolean>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    this.createNewModalWithData = new BehaviorSubject(null);
    this.createNewSnackbarWithData = new BehaviorSubject(null);
    this.activateLoader = new BehaviorSubject(false);
   }
  createModal(viewContainerRef: ViewContainerRef, data: string) {
    this.createNewComponent(viewContainerRef, ModalComponent, data);
  }

  createSnackBar(viewContainerRef: ViewContainerRef, data: string) {
    this.createNewComponent(viewContainerRef, SnackbarComponent, data);
  }
  createNewComponent(viewContainerRef: ViewContainerRef, component, data?: string) {
    viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.selfRef = componentRef;
    if (data) {
      componentRef.instance.data = data;
    }
  }

}
