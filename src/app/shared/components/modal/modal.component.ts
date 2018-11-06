import { Component, ComponentRef, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() selfRef: ComponentRef<ModalComponent>;
  @Input() data: string;

  constructor() { }

  ngOnInit() {
  }
  close() {
    this.selfRef.destroy();
  }

}
