import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { map, switchMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';

import * as toppingsActions from '../actions/toppings.action';

import { Topping } from '../../models/topping.model';
import { ToppingsService } from './../../services/toppings.service';

@Injectable()
export class ToppingsEffects {
    constructor(private actions$: Actions, private toppingsService: ToppingsService) {}

    @Effect()
    loadToppings$ = this.actions$.ofType(toppingsActions.LOAD_TOPPINGS).pipe(
        switchMap(() => this.toppingsService.getToppings()),
        map((toppings: Topping[]) => new toppingsActions.LoadToppingsSuccess(toppings)),
        catchError((error: any) => of(new toppingsActions.LoadToppingsFail(error)))
    );
}