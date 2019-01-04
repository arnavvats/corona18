import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CollegeService } from 'src/app/shared/services/college.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  backendError: string;
  loading: Boolean;
  signInForms: FormArray;
    // status can be resendVerification, signIn, signUp, resendVerification, forgotPassword, help;
    status = 'signIn';
  private referrer: string;
  constructor(private auth: AuthService,
     private modalService: ModalService,
     private collegeService: CollegeService,
     private router: Router,
     private activatedRoute: ActivatedRoute
     ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  this.signUpForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^(?!.*  ).+')]),
    'collegeId': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'collegeName': new FormControl(null, [Validators.minLength(3)]),
    'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)])
  }, () => this.validateCollegeName());
  this.loading = false;
  this.signInForms = new FormArray([this.loginForm, this.signUpForm], () => this.confirmPassword());
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.referrer = (params && params['ref']) || null;
    });
  }
  confirmPassword() {
    if (this.status !== 'signIn' &&
      (this.loginForm.get('password').value !== this.signUpForm.get('confirmPassword').value)) {
      return {passwordMismatch: true};
      }
    return undefined;
  }
  validateCollegeName() {
    if (this.status !== 'signIn' && this.signUpForm.get('collegeId').value === 'other'
         && (this.signUpForm.get('collegeName').value === null || this.signUpForm.get('collegeName').value.length < 3)) {
          return {collegeNameShort: true};
    }
    return undefined;
  }

  async signUp() {
    this.loading = true;
    this.modalService.activateLoader.next('Just a second...signing you up');
    try {
     await this.auth.signUp({...this.loginForm.value, ...this.signUpForm.value, referrer: this.referrer});
     this.modalService.createNewModalWithData.next('success, please verify your email...a link has been sent to you!');
    } catch (e) {
      this.backendError = e;
    } finally {
      this.loading = false;
      this.modalService.activateLoader.next(false);
    }
  }
  async signIn() {
    if (this.loginForm.valid) {
        this.loading = true;
        this.modalService.activateLoader.next('Just a second...signing you in');
        try {
          await this.auth.signIn(this.loginForm.value);
          this.modalService.activateLoader.next(false);
          this.router.navigateByUrl('/');
      } catch (e) {
        this.backendError = e;
      } finally {
        this.loading = false;
        this.modalService.activateLoader.next(false);
      }
    }
  }
  async forgotPassword() {
    if (this.loginForm.get('email').valid) {
      this.backendError = '';
    try {
      this.loading = true;
      this.modalService.activateLoader.next('Sending link to ' + this.loginForm.get('email').value);
      await this.auth.forgotPassword(this.loginForm.get('email').value);
      this.modalService.createNewModalWithData.next('Success...please check your email to reset password');
    } catch (e) {
      this.backendError = e;
    } finally {
      this.loading = false;
      this.modalService.activateLoader.next(false);
    }
  }
}

mapStatusString() {
  switch (this.status) {
    case 'signIn':
    return 'Sign In';
    case 'signUp':
    return 'Sign Up';
    case 'forgotPassword':
    return 'Forgot Password';
    case 'resendVerification':
    return 'Resend Email';
    case 'help':
    return 'Help';
  }
  return 'Unknown';
}
async resendEmailVerification() {
  this.backendError = '';
  this.loading = true;
  this.modalService.activateLoader.next('Sending mail verification...');
  if (this.loginForm.valid) {
    try {
    await this.auth.resendVerificationMail(this.loginForm.value);
    } catch (e) {
      this.backendError = e;
      this.modalService.createNewModalWithData.next(e);
    } finally {
      this.loading = false;
      this.modalService.activateLoader.next(false);
    }
  }
}
submitAccordingToStatus() {
  switch (this.status) {
    case 'signIn':
    return this.signIn();
    case 'signUp':
    return this.signUp();
    case 'forgotPassword':
    return this.forgotPassword();
    case 'resendVerification':
    return this.resendEmailVerification();
  }
}
changeStatus(status) {
  window.scrollTo(0, 0);
  this.status = status;
}

}
