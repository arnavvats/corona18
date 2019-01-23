import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, flatMap, take } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LiveStreamService {
  liveStreamsArray: Array<LiveStream>;
  constructor(private afDb: AngularFireDatabase) {
  }
  listenToAllStreams() {
   return this.afDb.object('live-streams').valueChanges().pipe(flatMap((allLiveStreamArrays) => {
     if (!allLiveStreamArrays) {
      allLiveStreamArrays = [];
     }
      return forkJoin(Object.keys(allLiveStreamArrays).map(uid => {
        return this.afDb.object('users/' + uid + '/name').valueChanges().pipe(take(1), map(name => {
          return allLiveStreamArrays[uid].map(liveStreamData => {
            return new LiveStream({...liveStreamData, createdBy: name});
          });
        }));
      }));
  }), map(arrayOfLiveStreamGroups => {
    const finalStreamArray = [];
    arrayOfLiveStreamGroups.forEach(liveStreamGroup => liveStreamGroup.forEach(liveStream => finalStreamArray.push(liveStream)));
    return finalStreamArray;
  }));
}
}
export class LiveStream {
  createdBy: string;
  startsAt: number;
  endsAt: number;
  description: string;
  title: string;
  src: string;
  constructor(data) {
    this.createdBy = data && data.createdBy || 'Unknown';
    this.startsAt = data && data.startsAt || null;
    this.endsAt = data && data.endsAt || null;
    const index1 = (data && data.script).indexOf('src="');
    const index2  = (data && data.script).indexOf('"', index1 + 5);
    this.src = (data && data.script).substring(index1 + 5, index2);
    this.title = data && data.title || null;
    this.description = data && data.description || 'Unknown';
  }
  get bgStyle() {
    const embedIndex = this.src.indexOf('embed');
    const videoId = this.src.substring(embedIndex + 6);
    return {
      'background-image': 'url("https://img.youtube.com/vi/' + videoId + '/0.jpg")',
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat'
    };
  }
}

