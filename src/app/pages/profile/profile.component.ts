import { ImageCompressService } from 'ng2-image-compress';
import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { ProfileService } from './profile.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CollegeService } from 'src/app/shared/services/college.service';
import { FestPackageFactory } from 'src/app/shared/models/package-mapping';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
@ViewChild('profileImageHolder') profileImageHolder: ElementRef;
  detailsForm = new FormGroup({
    'phoneNumber': new FormControl(null, [Validators.max(9999999999), Validators.min(6000000000)]),
    'photoURL': new FormControl(null),
    'rollNo': new FormControl(null),
    'yearOfCompletion': new FormControl(null, [Validators.max(2100), Validators.min(1900)]),
    'degree': new FormControl(null),
    'branch': new FormControl(null)
  });
  imageFile;
  currentProfile;
  percentageComplete = 0;
  packages = [];
  constructor(private userService: UserService, private profileService: ProfileService,
    private collegeService: CollegeService, private imgCompressService: ImageCompressService,
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
    this.detailsForm.disable();
    const uid = this.userService.uid;
    return this.userService.getUserDetail().then(res => {
        if (res) {
       this.currentProfile = res;
       console.log(this.currentProfile);
       const currentFormValue = this.detailsForm.value;
        Object.keys(currentFormValue).forEach(formKey => {
          currentFormValue[formKey] = (this.currentProfile && this.currentProfile[formKey]) || null;
        });
       this.detailsForm.setValue(currentFormValue);
          if (this.currentProfile.packages) {
            this.packages = this.getPackageInfo(this.currentProfile.packages);
          }
        return this.getAdminAccessName()
       .then(() => {
         if (!this.currentProfile.tcfId) {
          this.detailsForm.enable();
       }
        if (this.profileImageHolder) {
        if (this.currentProfile.photoURL) {
          this.renderer.
          setStyle(this.profileImageHolder.nativeElement, 'background-image', 'url(\'' + this.currentProfile.photoURL + '\')');
        } else {
          this.renderer.removeStyle(this.profileImageHolder.nativeElement, 'background-image');
        }
      }
       });
      }
      });
  }
   async previewImage(e) {
    this.imageFile = await this.profileService.checkAndCompressFile(e.target.files[0]);
    const url = URL.createObjectURL(this.imageFile);
    this.renderer.setStyle(this.profileImageHolder.nativeElement, 'background-image', 'url(\'' + url + '\')');
    this.detailsForm.get('photoURL').enable();
}


  async getAdminAccessName() {
    if (this.currentProfile.admin) {
    return await this.collegeService.getEventNameFromId(this.currentProfile.admin).then(res => {
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
    const updationData = {};
     Object.assign(updationData, this.detailsForm.value);
    Object.keys(updationData).forEach(key => {
      if (updationData[key] === undefined) {
        delete updationData[key];
      }
    });
    await this.profileService.updateProfileDatabase(updationData, uid);
    await this.setCurrentProfile();

  } catch (e) {
    console.log(e);
    this.modalService.createNewSnackbarWithData.next('Oops, an error occurred while updating profile');
  }
  finally {
    this.modalService.activateLoader.next(false);
  }
  }
    getPackageInfo(packs) {
    if (!packs || packs.length === 0) {
      return[];
    }
    return packs.map(pack => FestPackageFactory(pack));
  }
}
