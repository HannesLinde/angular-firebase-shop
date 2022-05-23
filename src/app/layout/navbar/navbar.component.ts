import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isHandset$!: Observable<boolean>;
  @ViewChild(MatSidenav) drawer!: MatSidenav;

  constructor(private breakpointObserver: BreakpointObserver) {}
  ngOnInit(): void {
    this.isHandset$ = this.breakpointObserver.observe([`(max-width: 720px)`]).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  toggel() {
    this.drawer.toggle();
  }
}
