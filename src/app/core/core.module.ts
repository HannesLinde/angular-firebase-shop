import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideAuth, getAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [],
  exports: [],
  imports: [CommonModule, provideAuth(() => getAuth())],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('Core is already loaded. Import it in the AppModule only');
    }
  }
}
