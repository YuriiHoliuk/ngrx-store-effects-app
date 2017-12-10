import { createSelector } from '@ngrx/store';

import * as fromProducts from '../reducers/index';
import * as fromPizzas from '../reducers/pizzas.reducer';

export const getPizzasState = createSelector(
    fromProducts.getProductsState,
    (state: fromProducts.ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(
    getPizzasState,
    fromPizzas.getPizzasEntities
);

export const getAllPizzas = createSelector(
    getPizzasState,
    fromPizzas.getAllPizzas
);

export const getPizzasLoaded = createSelector(
    getPizzasState,
    fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
    getPizzasState,
    fromPizzas.getPizzasLoading
);