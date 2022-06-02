import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { User } from '@app/core/services/user';
import { select, Store } from '@ngrx/store';
import { map, Observable, debounceTime } from 'rxjs';
import { UserState } from './store/reducers/login.reducer';
import { getAuthentification } from './store/selectors/login.selector';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userStore: Store<UserState>, private route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStore.pipe(
      debounceTime(500),
      select(getAuthentification),
      map((user: User | null) => {
        if (user && user.admin) {
          return true;
        }
        console.error('Access denied');
        return false;
      })
    );
  }
}
