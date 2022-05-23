import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';

@NgModule({
  declarations: [NavbarComponent, MainToolbarComponent],
  imports: [RouterModule, SharedModule, CommonModule],
  exports: [NavbarComponent],
})
export class LayoutModule {
  static components = [NavbarComponent];
}
