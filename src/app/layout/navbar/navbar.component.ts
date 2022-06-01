import { Component, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { User } from '@app/core/services/user';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { Store } from '@ngrx/store';
import { getAuthentification } from '@app/login/store/selectors/login.selector';
import { AppState } from '@app/store/reducers/app.reducer';
import { getHandSet } from '@app/store/selectors/app.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isHandset$!: Observable<boolean>;
  user$?: Observable<User | null>;
  @ViewChild(MatSidenav) drawer!: MatSidenav;

  constructor(private userStore: Store<UserState>, private appStore: Store<AppState>) {}
  ngOnInit(): void {
    this.user$ = this.userStore.select(getAuthentification);
    this.isHandset$ = this.appStore.select(getHandSet);
  }

  toggel() {
    this.drawer.toggle();
  }
}
