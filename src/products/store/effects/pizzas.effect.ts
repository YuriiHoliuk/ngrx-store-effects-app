import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as pizzasActions from '../actions/pizzas.action';
import * as fromRoot from '../../../app/store';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services';
import {CreatePizzaSuccess, DeletePizzaSuccess} from "../actions";

@Injectable()
export class PizzasEffects {

  constructor(private actions$: Actions, private pizzasService: PizzasService) {
  }

  @Effect()
  loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS).pipe(
    switchMap(() => this.pizzasService.getPizzas()),
    map((pizzas: Pizza[]) => new pizzasActions.LoadPizzasSuccess(pizzas)),
    catchError((error: any) => of(new pizzasActions.LoadPizzasFail(error)))
  );

  @Effect()
  createPizza$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA).pipe(
    map((action: pizzasActions.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => this.pizzasService.createPizza(pizza)),
    map((pizza: Pizza) => new pizzasActions.CreatePizzaSuccess(pizza)),
    catchError(error => of(new pizzasActions.CreatePizzaFail(error)))
  );

  @Effect()
  updatePizza$ = this.actions$.ofType(pizzasActions.UPDATE_PIZZA).pipe(
    map((action: pizzasActions.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => this.pizzasService.updatePizza(pizza)),
    map((pizza: Pizza) => new pizzasActions.UpdatePizzaSuccess(pizza)),
    catchError(error => of(new pizzasActions.UpdatePizzaFail(error)))
  );

  @Effect()
  deletePizza$ = this.actions$.ofType(pizzasActions.DELETE_PIZZA).pipe(
    map((action: pizzasActions.CreatePizza) => action.payload),
    switchMap((pizza: Pizza) => {
      return this.pizzasService.removePizza(pizza).pipe(
        map(() => new pizzasActions.DeletePizzaSuccess(pizza)),
        catchError(error => of(new pizzasActions.DeletePizzaFail(error)))
      );
    }),
  );

  @Effect()
  productsRedirect$ = this.actions$.ofType(pizzasActions.UPDATE_PIZZA_SUCCESS, pizzasActions.DELETE_PIZZA_SUCCESS).pipe(
    map(() => new fromRoot.Go({ url: ['/products'] }))
  );

  @Effect()
  createPizzaRedirect$ = this.actions$.ofType(pizzasActions.CREATE_PIZZA_SUCCESS).pipe(
    map((action: CreatePizzaSuccess)=> action.payload.id.toString(10)),
    map((id: string) => new fromRoot.Go({ url: ['/products', id] }))
  );
}
