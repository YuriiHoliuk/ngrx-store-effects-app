import { Injectable } from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import { Observable } from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {ProductsState} from "../store/reducers";
import * as fromStore from '../store';
import * as fromRootStore from '../../app/store';
import {catchError, filter, map, switchMap, take, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class PizzaExistGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate(activatedRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(fromStore.getPizzasLoaded).pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1),
      switchMap(() => this.store.select(fromStore.getPizzasEntities)),
      take(1),
      map(pizzas => !!pizzas[activatedRoute.params.pizzaId]),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromRootStore.Go({ url: ['/products'] }));
        }
      }),
      catchError(() => of(false))
    );
  }
}
