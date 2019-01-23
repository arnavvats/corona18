import { LiveStreamService, LiveStream } from './live-stream.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.scss']
})
export class LiveStreamComponent implements OnInit {
  liveStreams: Array<LiveStream> = [];
  openedStream = null;
  constructor(private liveStreamService: LiveStreamService) {
    this.liveStreamService.listenToAllStreams().subscribe(res => {
      this.liveStreams = res;
    });
   }

  ngOnInit() {
  }

  openStream(stream) {
    this.openedStream = stream;
  }
  closeStream() {
    this.openedStream = null;
  }

}
