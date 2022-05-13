import {Component} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthenticationService} from "../core/services/Auth.service";
import {User} from "@app/core/services/user";

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
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logInFormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });
  signUpFormGroup = new FormGroup({
    emailSignUp: new FormControl("", [Validators.required, Validators.email]),
    passwordSignUp: new FormControl("", Validators.required),
  });

  matcher = new MyErrorStateMatcher();

  user = localStorage['user'] !== 'null' ? true : false;

  userData = this.auth.userData

  constructor(private auth: AuthenticationService) {
  }

  submitLoginData() {
    console.log("login submitted");
    console.log(this.logInFormGroup.value);
    this.auth.SignIn(this.logInFormGroup.value.email, this.logInFormGroup.value.password);

  }

  submitSignUp() {
    console.log(this.signUpFormGroup.value);
    this.auth.SignUp(this.signUpFormGroup.value.email, this.signUpFormGroup.value.password)
  }

  logOut() {
    console.log(this.user);
    console.log("Logout!");
    this.auth.SignOut();
    this.user = false;
    // this.userData = {};
  }
}
