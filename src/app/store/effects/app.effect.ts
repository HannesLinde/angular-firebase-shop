import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, shareReplay } from 'rxjs';
import { AppPageAction } from '../actions';

@Injectable()
export class AppEffect {
  constructor(private actions$: Actions, private breakpointObserver: BreakpointObserver) {}

  $headset = createEffect(() => {
    return this.breakpointObserver.observe([`(max-width: 720px)`]).pipe(
      map((result) => AppPageAction.setHandSet({ isHandset: result.matches })),
      shareReplay()
    );
  });
}
