import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginApiActions, LoginPageActions } from '../actions';
import { mergeMap, map, catchError, of, from, tap } from 'rxjs';
import { AuthenticationService } from '@app/core/services/Auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.signIn),
      mergeMap((action) =>
        from(this.authenticationService.SignIn(action.loginData.email, action.loginData.password)).pipe(
          map((user) => {
            this.router.navigate(['']);
            return LoginApiActions.signInSuccess({ user: user ? user : null });
          }),
          catchError((errorMessage) => of(LoginApiActions.signInError({ errorMessage })))
        )
      )
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.signUp),
      mergeMap((action) =>
        from(this.authenticationService.SignUp(action.loginData.email, action.loginData.password)).pipe(
          map((user) => {
            this.router.navigate(['']);
            return LoginApiActions.signUpSuccess({ user: user ? user : null });
          }),
          catchError((errorMessage) => of(LoginApiActions.signUpError({ errorMessage })))
        )
      )
    );
  });

  logOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.logOut),
      mergeMap(() =>
        from(this.authenticationService.SignOut()).pipe(
          map(() => LoginApiActions.logOutSuccess()),
          catchError((errorMessage) => of(LoginApiActions.logOutError({ errorMessage })))
        )
      )
    );
  });
}
