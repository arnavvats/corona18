import { Component, OnInit, Input, ComponentRef } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  @Input() selfRef: ComponentRef<ModalComponent>;
  @Input() data: string;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.selfRef.destroy();
    }, 4800);
  }

}
