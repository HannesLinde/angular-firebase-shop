import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  @Output() filter = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  applyFilter(event: any) {
    event.preventDefault();
    this.filter.emit(event);
  }
}
