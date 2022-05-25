import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { getAuthentification } from '@app/login/store/selectors/login.selector';
import { select, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private userStore: Store<UserState>, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStore.pipe(
      select(getAuthentification),
      map((user) => {
        if (!user) {
          this.route.navigateByUrl('/login');
          return false;
        }
        return true;
      })
    );
  }
}
