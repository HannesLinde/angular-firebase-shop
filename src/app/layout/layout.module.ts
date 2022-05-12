import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent],
  imports: [RouterModule, SharedModule, CommonModule],
  exports: [NavbarComponent],
})
export class LayoutModule {
  static components = [NavbarComponent];
}
