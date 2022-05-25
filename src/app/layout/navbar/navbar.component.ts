import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '@app/core/services/user';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { Store } from '@ngrx/store';
import { getAuthentification } from '@app/login/store/selectors/login.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isHandset$!: Observable<boolean>;
  user$?: Observable<User | null>;
  @ViewChild(MatSidenav) drawer!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver, private userStore: Store<UserState>) {}
  ngOnInit(): void {
    this.user$ = this.userStore.select(getAuthentification);
    this.isHandset$ = this.breakpointObserver.observe([`(max-width: 720px)`]).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  toggel() {
    this.drawer.toggle();
  }
}
