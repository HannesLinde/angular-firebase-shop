//Angular and Firebase
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from 'src/environments/environment';

//Modules
import { CoreModule } from '@app/core/core.module';
import { AppRoutingModule } from '@app/app-routing.module';

//Components
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

//Directives
import { AuthenticationService } from '@app/core/services/Auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginModule } from './login/login.module';
import { ShellComponent } from './shell/shell.component';
import { ProductsModule } from './products/products.module';
import { AppEffect } from './store/effects/app.effect';
import { appReducer } from './store/reducers/app.reducer';

//Pipes

@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    ProductsModule,
    LoginModule,
    StoreModule.forRoot({ root: appReducer }),
    EffectsModule.forRoot([AppEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
