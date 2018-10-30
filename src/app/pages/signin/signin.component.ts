import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  signInOnly: Boolean;
  constructor() {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.email]),
      'password': new FormControl('', [Validators.minLength(6)])
    }, () => this.confirmPassword());
  this.signUpForm = new FormGroup({
    'name': new FormControl('', [Validators.minLength(3)]),
    'confirmPassword': new FormControl('', [Validators.minLength(6)])
  }, () => this.confirmPassword());
  this.signInOnly = false;
  }

  ngOnInit() {
  }
  confirmPassword() {
    if (this.signInOnly === false &&
      (this.loginForm.get('password').value === this.signUpForm.get('confirmPassword').value)) {
      return {passwordMismatch: true};
    }
    return undefined;
  }
  submit() {
  }

}
