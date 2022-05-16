import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '../core/services/Auth.service';
import { User } from '@app/core/services/user';
import { Store } from '@ngrx/store';
import { UserState } from '@app/login/store/reducer/login.reducer';
import { loginSubmission } from '@app/login/store/actions/login.action';

/** https://material.angular.io/components/input/overview */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  signUpFormGroup = new FormGroup({
    emailSignUp: new FormControl('', [Validators.required, Validators.email]),
    passwordSignUp: new FormControl('', Validators.required),
  });

  matcher = new MyErrorStateMatcher();

  signUp = false;

  user = localStorage['user'] !== 'null' ? true : false;

  userData = this.auth.userData;

  constructor(private auth: AuthenticationService, private store: Store<UserState>) {}

  submitLoginData() {
    console.log(this.logInFormGroup.value);
    console.log('login submitted');
    this.store.dispatch(loginSubmission({ loginData: this.logInFormGroup.value }));
  }

  submitSignUp() {
    console.log(this.signUpFormGroup.value);
    this.auth.SignUp(this.signUpFormGroup.value.email, this.signUpFormGroup.value.password);
  }

  logOut() {
    console.log(this.user);
    console.log('Logout!');
    this.auth.SignOut();
    this.user = false;
    // this.userData = {};
  }
}
