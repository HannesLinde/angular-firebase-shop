import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '@app/core/services/user';
import { MyErrorStateMatcher } from '@app/shared/error-matcher';
import { State, Store } from '@ngrx/store';
import { from, NEVER, Observable, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/Auth.service';
import { LoginPageActions } from '../store/actions';
import { UserState } from '../store/reducers/login.reducer';
import { getAuthentification, getError, getLoading } from '../store/selectors/login.selector';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SignInComponent implements OnInit {
  logInFormGroup!: FormGroup;

  matcher: MyErrorStateMatcher;
  errorMessage$!: Observable<string>;
  loading$!: Observable<boolean>;
  user$?: Observable<User | null>;

  constructor(private userStore: Store<UserState>, private auth: AuthenticationService, private fb: FormBuilder) {
    this.matcher = new MyErrorStateMatcher();
  }
  ngOnInit(): void {
    this.userStore.dispatch(LoginPageActions.resetError());
    this.user$ = this.userStore.select(getAuthentification);
    this.errorMessage$ = this.userStore.select(getError);
    this.loading$ = this.userStore.select(getLoading);
    this.logInFormGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  submitLoginData() {
    this.userStore.dispatch(LoginPageActions.signIn({ loginData: this.logInFormGroup.value }));
  }

  signInwithGoogle() {
    this.auth.singWithGoogle();
  }

  logOut() {
    this.userStore.dispatch(LoginPageActions.logOut());
  }
}
