//Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';

//Modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

//Components
import { AppComponent } from './app.component';
import {LoginModule} from "./login/login.module";
import {LayoutModule} from "./layout/layout.module";
import { DashboardComponent } from './dashboard/dashboard.component';

//Directives

//Pipes

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    LoginModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
