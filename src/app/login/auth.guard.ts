import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { getAuthentification } from '@app/login/store/selectors/login.selector';
import { select, Store } from '@ngrx/store';
import { Observable, map, delay, debounceTime } from 'rxjs';
import { UserSerivce } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userStore: Store<UserState>, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStore.pipe(
      debounceTime(500), // give time to firestore to update the user state when refresh
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
