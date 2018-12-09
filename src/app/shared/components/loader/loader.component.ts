import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderString: string;
  loaderInterval;
  constructor(private modalService: ModalService) {
   }
  ngOnInit() {
    this.modalService.activateLoader.subscribe(val => {
      if (val && val !== undefined ) {
        this.loaderString = <string>val;
      } else {
        this.loaderString = 'Loading';
      }
    });
  }

}
