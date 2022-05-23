import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css'],
})
export class MainToolbarComponent implements OnInit {
  @Output() toggleSideNave = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  toggle(event: any) {
    this.toggleSideNave.emit();
  }
}
