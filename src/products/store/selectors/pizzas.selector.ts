import { Params } from '@angular/router';
import { createSelector } from '@ngrx/store';

import { Pizza } from './../../models/pizza.model';
import { Topping } from 'src/products/models/topping.model';

import * as fromRoot from '../../../app/store';
import * as fromProducts from '../reducers/index';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as toppingsSelectors from './toppings.selector';

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

export const getSelectedPizza = createSelector(
    getPizzasEntities,
    fromRoot.getRouterParams,
    (entities: { [key: number]: Pizza}, params: Params) => {
        return params ? entities[params.pizzaId] || {} : {};
    }
);

export const getPizzaVizualized = createSelector(
    getSelectedPizza,
    toppingsSelectors.getSelectedToppings,
    toppingsSelectors.getAllToppings,
    (selectedPizza: Pizza, selectedToppings: number[], allToppings: Topping[]) => {
        const toppings = selectedToppings.map(id => allToppings[id]);

        return {
            ...selectedPizza,
            toppings
        };
    }
)

export const getPizzasLoaded = createSelector(
    getPizzasState,
    fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
    getPizzasState,
    fromPizzas.getPizzasLoading
);