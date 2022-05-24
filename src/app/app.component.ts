import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  say = '';

  constructor(private auth: AuthenticationService) {}
  ngOnInit(): void {}
}
