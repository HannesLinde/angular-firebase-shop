import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
//Modules
import {AngularFireModule} from "@angular/fire/compat";

//Components
import {environment} from "../../environments/environment";
//Directives

//Pipes

@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core is already loaded. Import it in the AppModule only');
    }
  }
}
