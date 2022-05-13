//Angular and Firebase
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {getAuth, provideAuth} from "@angular/fire/auth";

import { environment } from 'src/environments/environment';

//Modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import {LayoutModule} from "./layout/layout.module";
import { ReactiveFormsModule } from '@angular/forms';

//Directives
import {AuthenticationService} from "@app/core/services/Auth.service";

//Pipes

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LoginModule,
    LayoutModule
  ],
  providers: [
    AuthenticationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
