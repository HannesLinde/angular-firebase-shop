import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginActions } from '../actions';
import { mergeMap, map, catchError, of } from 'rxjs';
import { AuthenticationService } from '@app/core/services/Auth.service';
import { User } from '@angular/fire/auth';
import { LoginData } from '@app/login/store/actions/login.action';

@Injectable()
export class LoginEffect {
  constructor(private actions$: Actions, private loginService: AuthenticationService) {}

  loginSubmit$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(LoginActions.loginSubmission),
      mergeMap(({ loginData: loginData }) => {
        console.log('loginData: ', loginData);
        console.log(this.loginService.SignIn(loginData));
        return this.loginService.SignIn(loginData).pipe(
          map((user: User) => {
            return LoginActions.loginSuccess({ user: user });
          }),
          catchError((errorMessage: string) => of(LoginActions.loginFailure({ errorMessage })))
        );
      })
    );
  });
}
