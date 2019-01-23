import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({providedIn: 'root'})
export class ProfileService {
  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase, private afStorage: AngularFireStorage) {

  }
  updateProfileDatabase(data, uid) {
      return this.afDB.database.ref('users/' + uid ).update(data);
  }
  updateProfilePicture(image, uid) {
    const randomId = Math.random().toString(36).substring(2);
    return this.afStorage.storage.ref('profile-pictures/' + uid + '/' + randomId).put(image).then((res) => {
      return this.afStorage.ref('profile-pictures/' + uid + '/' + randomId).getDownloadURL().toPromise();
    })
    .then((url) => {
      const currentUser = this.afAuth.auth.currentUser;
      return currentUser.updateProfile({displayName: currentUser.displayName, photoURL: url}).then(res => url);
    });
  }
   checkAndCompressFile(imageFile) {
     return new Promise((resolve, reject) => {
      if (imageFile.type.slice(0, 5) !== 'image') {
       reject('File is not image');
      }
      const mimeType = imageFile.type;
      const fileName = imageFile.name;
      if (imageFile.size / 1024 <= 10 || imageFile.size / (1024 * 1024) > 5) {
          reject('Size should be between 10KB and 5MB');
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.onload = event => {
      const img = new Image();
      img.src = (<any>event.target).result;
      img.onload = () => {
              const quality = this.getOptimalHeightWidthAndQuality(img.width, img.height, imageFile.size);
              const elem = document.createElement('canvas');
              elem.setAttribute('height', img.height.toString());
              elem.setAttribute('width', img.width.toString());
              const ctx = elem.getContext('2d');
              ctx.drawImage(img, 0, 0, img.width, img.height);
              ctx.canvas.toBlob((blob) => {
                  const file = new File([blob], fileName, {
                      type: mimeType,
                      lastModified: Date.now()
                  });
                  resolve(file);
              }, mimeType, quality);
          },
          fileReader.onerror = (error) => {
            reject(error);
          };
    };
     });
  }

  getOptimalHeightWidthAndQuality(width, height, size) {
    let quality = 1;
    if (width > 1080) {
      quality -= (width - 1920) / 3000;
    }
     if (height > 720) {
      quality -= (height - 720) / 3000;
    }
     if (size >= 100000) {
      quality -= (size - 100000) /  1000000;
    }
    if (quality <= 0.02) {
      quality = 0.02;
    }

    return quality;
  }
}
