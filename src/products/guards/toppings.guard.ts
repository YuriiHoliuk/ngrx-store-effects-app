import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Observable } from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {ProductsState} from "../store/reducers";
import * as fromStore from '../store';
import {catchError, filter, take, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromStore.getToppingsLoaded).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadToppings());
        }
      }),
      filter(loaded => loaded),
      take(1),
      catchError(() => of(false))
    );
  }
}
