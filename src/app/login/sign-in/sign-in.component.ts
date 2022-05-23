import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { State, Store } from '@ngrx/store';
import { NEVER, Observable, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/Auth.service';
import { LoginPageActions } from '../store/actions';
import { UserState } from '../store/reducers/login.reducer';
import { getAuthentification } from '../store/selectors/login.selector';

/** https://material.angular.io/components/input/overview */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  logInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  matcher = new MyErrorStateMatcher();

  user = localStorage['user'] !== 'null' ? true : false;

  //userData = this.auth.userData;

  use$?: Observable<User | undefined>;

  constructor(private auth: AuthenticationService, private userStore: Store<UserState>) {}
  ngOnInit(): void {
    //this.userData = this.auth.userData;
    //console.log('test' + this.userData);
    this.use$ = this.userStore.select(getAuthentification);
  }

  submitLoginData() {
    /*console.log('login submitted');
    console.log(this.logInFormGroup.value);*/
    //this.auth.SignIn(this.logInFormGroup.value.email, this.logInFormGroup.value.password);
    this.userStore.dispatch(LoginPageActions.signIn({ loginData: this.logInFormGroup.value }));
  }

  logOut() {
    //this.auth.SignOut();
    this.userStore.dispatch(LoginPageActions.logOut());
    //this.$use = of(undefined);
  }
}
