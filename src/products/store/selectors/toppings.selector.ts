import { createSelector } from '@ngrx/store';

import { Topping } from './../../models/topping.model';

import * as fromProducts from '../reducers/index';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(
    fromProducts.getProductsState,
    (state: fromProducts.ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(
    getToppingsState,
    fromToppings.getToppingsEntities
);

export const getAllToppings = createSelector(
    getToppingsState,
    fromToppings.getAllToppings
);

export const getToppingsLoaded = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
    getToppingsState,
    fromToppings.getToppingsLoading
);

export const getSelectedToppings = createSelector(
    getToppingsState,
    fromToppings.getSelectedToppings,
);