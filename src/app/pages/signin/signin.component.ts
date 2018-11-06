import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CollegeService } from 'src/app/shared/services/college.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  signInOnly: Boolean;
  backendError: string;
  loading: Boolean;
  collegeList: Array<any>;
  signInForms: FormArray;
  constructor(private auth: AuthService,
     private modalService: ModalService,
     private collegeService: CollegeService,
     private router: Router
     ) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  this.signUpForm = new FormGroup({
    'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'collegeId': new FormControl('', [Validators.required, Validators.minLength(3)]),
    'collegeName': new FormControl('', [Validators.minLength(3)]),
    'confirmPassword': new FormControl('', [Validators.required, Validators.minLength(6)])
  }, () => this.validateCollegeName());
  this.signInOnly = false;
  this.loading = false;
  this.signInForms = new FormArray([this.loginForm, this.signUpForm], () => this.confirmPassword());
  }

  ngOnInit() {
    this.collegeService.getAllCollegeList().toPromise().then(res => {
      this.collegeList = res;
    });
  }
  confirmPassword() {
    if (this.signInOnly === false &&
      (this.loginForm.get('password').value !== this.signUpForm.get('confirmPassword').value)) {
      return {passwordMismatch: true};
      }
    return undefined;
  }
  validateCollegeName() {
    if (this.signInOnly === false && this.signUpForm.get('collegeId').value === 'custom'
         && this.signUpForm.get('collegeName').value.length < 3) {
          return {collegeNameShort: true};
    }
    return undefined;
  }

  async signUp() {
    this.loading = true;
    try {
     await this.auth.signUp({...this.loginForm.value, ...this.signUpForm.value});
     this.modalService.createNewModalWithData.next('success, please verify your email...a link has been sent to you!');
    } catch (e) {
      this.backendError = e;
    } finally {
      this.loading = false;
    }
  }
  async signIn() {
    if (this.loginForm.valid) {
        this.loading = true;
        try {
          await this.auth.signIn(this.loginForm.value);
          this.router.navigateByUrl('/');
      } catch (e) {
        this.backendError = e;
      } finally {
        this.loading = false;
      }
    }
  }

}
