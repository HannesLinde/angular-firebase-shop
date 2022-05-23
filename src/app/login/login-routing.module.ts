import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'sign-up', component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {
  static components = [LoginComponent, SignInComponent, SignUpComponent];
}
