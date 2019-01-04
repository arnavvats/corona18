import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileService } from './profile.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CollegeService } from 'src/app/shared/services/college.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
@ViewChild('profileImageHolder') profileImageHolder: ElementRef;
  detailsForm = new FormGroup({
    'phoneNumber': new FormControl(null, [Validators.max(9999999999), Validators.min(6000000000)]),
    'photoURL': new FormControl(''),
    'collegeName': new FormControl(null),
    'rollNo': new FormControl(null),
    'yearOfCompletion': new FormControl(null, [Validators.max(2100), Validators.min(1900)]),
    'degree': new FormControl(null),
    'branch': new FormControl(null)
  });
  imageFile;
  currentProfile;
  percentageComplete = 0;
  constructor(private userService: UserService, private profileService: ProfileService,
    private collegeService: CollegeService,
     private modalService: ModalService, private renderer: Renderer2) { }

  ngOnInit() {
    this.modalService.activateLoader.next('Loading Profile');
    this.userService.user$.subscribe(res => {
      if (res) {
        this.setCurrentProfile().then(() => {
          this.modalService.activateLoader.next(false);
        });
      }
    });

  }
  setCurrentProfile() {
    const uid = this.userService.uid;
    return this.userService.getUserDetail(uid).then(res => {
        if (res) {
       this.currentProfile = res;
       console.log(this.currentProfile);
       return this.getCurrentCollegeName().then(() => {
        return this.getAdminAccessName();
       }).then(() => {
        return this.calculatePercentage();
       }).then(() => {
        Object.keys(this.currentProfile).forEach(key => {
          if (this.detailsForm.get(key)) {
            this.detailsForm.get(key).disable();
            this.detailsForm.get(key).setValue(this.currentProfile[key]);
          }
        });
        if (this.currentProfile.photoURL) {
          this.renderer.
          setStyle(this.profileImageHolder.nativeElement, 'background-image', 'url(\'' + this.currentProfile.photoURL + '\')');
        } else {
          this.renderer.removeStyle(this.profileImageHolder.nativeElement, 'background-image');
        }
       });
      }
      });
  }
  previewImage(e) {
    this.imageFile = e.target.files[0];
    console.log(this.imageFile.size / 1024);
    console.log(this.imageFile);
    let errMsg = '';
    if (this.imageFile.type.slice(0, 5) !== 'image') {
        errMsg = 'File is not image';
    }

    if (this.imageFile.size / 1024 <= 10 || this.imageFile.size / (1024 * 1024) >= 10) {
        errMsg = 'Size should not be more than 10MB or less than 10KB';
    }
    if (errMsg !== '') {
        this.modalService.createNewSnackbarWithData.next(errMsg);
        this.imageFile = null;
        this.renderer.removeStyle(this.profileImageHolder.nativeElement, 'background-image');
        return;
    }
    const url = URL.createObjectURL(e.target.files[0]);
    this.renderer.setStyle(this.profileImageHolder.nativeElement, 'background-image', 'url(\'' + url + '\')');
    this.detailsForm.get('photoURL').enable();
}


  calculatePercentage() {
    let percent = 0;
    const regularKeys = ['name', 'email', 'phoneNumber', 'photoURL', 'rollNo', 'yearOfCompletion', 'degree', 'branch'];
   regularKeys.forEach(key => {
    if (this.currentProfile[key]) {
      percent += 11;
    }
   });
   if (this.currentProfile.collegeId !== 'other' || this.currentProfile.collegeName ) {
    percent += 12;
   }
   this.percentageComplete = percent;
  }

  getCurrentCollegeName() {
    return  this.collegeService.getCollegeNameFromId(this.currentProfile.collegeId).then((res) => {
     if (res) {
      this.currentProfile.collegeName = res;
     }
    });
  }

  getAdminAccessName() {
    if (this.currentProfile.admin) {
    this.collegeService.getEventNameFromId(this.currentProfile.admin).then(res => {
      this.currentProfile.adminAccess = res;
    });
  }
  }

  async updateProfile() {
    try {
      this.modalService.activateLoader.next('Updating Profile Info');
    const uid = this.userService.uid;
    this.modalService.activateLoader.next('Updating Profile');
    if (this.imageFile) {
      const url = await this.profileService.updateProfilePicture(this.imageFile, uid);
      this.detailsForm.get('photoURL').enable();
       this.detailsForm.get('photoURL').setValue(url);
    }
    await this.profileService.updateProfileDatabase(this.detailsForm.value, uid);
    await this.setCurrentProfile();

  } catch (e) {
    console.log(e);
    this.modalService.createNewSnackbarWithData.next('Oops, an error occurred while updating profile');
  }
  finally {
    this.modalService.activateLoader.next(false);

  }
  }
}
