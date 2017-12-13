import { Action } from '@ngrx/store';
import { Pizza } from '../../models/pizza.model';


// load pizzas
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas Success';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas Fail';

export class LoadPizzas implements Action {
    readonly type = LOAD_PIZZAS;
}

export class LoadPizzasSuccess implements Action {
    readonly type = LOAD_PIZZAS_SUCCESS;
    constructor(public payload: Pizza[]) {}
}

export class LoadPizzasFail implements Action {
    readonly type = LOAD_PIZZAS_FAIL;
    constructor(public payload: any) {}
}

// create pizzas
export const CREATE_PIZZAS = '[Products] Create Pizzas';
export const CREATE_PIZZAS_SUCCESS = '[Products] Create Pizzas Success';
export const CREATE_PIZZAS_FAIL = '[Products] Create Pizzas Fail';

export class CreatePizzas implements Action {
  readonly type = CREATE_PIZZAS;
}

export class CreatePizzasSuccess implements Action {
  readonly type = CREATE_PIZZAS_SUCCESS;
  constructor(public payload: Pizza[]) {}
}

export class CreatePizzasFail implements Action {
  readonly type = CREATE_PIZZAS_FAIL;
  constructor(public payload: any) {}
}

export type PizzasActions =
    | LoadPizzas
    | LoadPizzasSuccess
    | LoadPizzasFail
    | CreatePizzas
    | CreatePizzasSuccess
    | CreatePizzasFail;
