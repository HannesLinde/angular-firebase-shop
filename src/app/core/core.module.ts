import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

//Components
//Directives
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat';

//Pipes

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core is already loaded. Import it in the AppModule only');
    }
  }
}
