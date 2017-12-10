import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';

import * as pizzasActions from '../actions/pizzas.action';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from './../../services/pizzas.service';

@Injectable()
export class PizzasEffects {
    constructor(private actions$: Actions, private pizzasService: PizzasService) {}

    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzasActions.LOAD_PIZZAS).pipe(
        switchMap(() => this.pizzasService.getPizzas()),
        map((pizzas: Pizza[]) => new pizzasActions.LoadPizzasSuccess(pizzas)),
        catchError((error: any) => of(new pizzasActions.LoadPizzasFail(error)))
    );
}