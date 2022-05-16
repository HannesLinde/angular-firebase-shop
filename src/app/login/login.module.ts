import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffect } from '@app/login/store/effects/login.effect';
import { loginReducer } from '@app/login/store/reducer/login.reducer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('', loginReducer),
    EffectsModule.forFeature([LoginEffect]),
  ],
})
export class LoginModule {}
