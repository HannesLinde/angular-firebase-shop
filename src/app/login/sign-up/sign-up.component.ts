import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from '@app/core/services/Auth.service';
import { MyErrorStateMatcher } from '@app/shared/error-matcher';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginPageActions } from '../store/actions';
import { UserState } from '../store/reducers/login.reducer';
import { getError, getLoading } from '../store/selectors/login.selector';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpFormGroup!: FormGroup;
  matcher: MyErrorStateMatcher;
  loading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  constructor(private userStore: Store<UserState>, private auth: AuthenticationService, private fb: FormBuilder) {
    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
    this.userStore.dispatch(LoginPageActions.resetError());
    this.loading$ = this.userStore.select(getLoading);
    this.errorMessage$ = this.userStore.select(getError);
    this.signUpFormGroup = this.fb.group({
      displayName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  submitSignUp() {
    this.userStore.dispatch(LoginPageActions.signUp({ loginData: this.signUpFormGroup.value }));
  }
}
