import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/Auth.service';
import { User } from '@app/core/services/user';
import { LoginPageActions } from '@app/login/store/actions';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { getAuthentification } from '@app/login/store/selectors/login.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css'],
})
export class MainToolbarComponent implements OnInit {
  @Output() toggleSideNave = new EventEmitter<void>();
  user$?: Observable<User | null>;

  constructor(private userStore: Store<UserState>, private router: Router, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.user$ = this.userStore.select(getAuthentification);
  }

  toggle(event: any) {
    this.toggleSideNave.emit();
  }

  logOut() {
    this.userStore.dispatch(LoginPageActions.logOut());
  }
}
