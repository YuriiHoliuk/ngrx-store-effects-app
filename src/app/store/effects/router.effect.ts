import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as routerActions from '../actions/router.action';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect({ dispatch: false })
  navigation$ = this.actions$.ofType(routerActions.GO).pipe(
    map((action: routerActions.Go) => action.payload),
    map(data => ({ url: data.url, params: { ...data.queryParams, ...data.navigationExtras } })),
    switchMap(data => this.router.navigate(data.url, data.params))
  );
}
