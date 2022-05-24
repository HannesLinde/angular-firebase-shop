import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { LoginEffect } from '@app/login/store/effects/login.effects';
import { loginReducer } from '@app/login/store/reducers/login.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserSerivce } from './user.service';

@NgModule({
  declarations: [LoginRoutingModule.components],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('users', loginReducer),
    EffectsModule.forFeature([LoginEffect]),
  ],
  providers: [UserSerivce],
})
export class LoginModule {}
