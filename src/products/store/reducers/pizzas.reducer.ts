import { PizzasState } from './pizzas.reducer';
import { Pizza } from './../../models/pizza.model';
import * as fromPizzas from '../actions/pizzas.action';
import { toEntities } from '../../../utils/toEntities';

export interface PizzasState {
    entities: { [key: number]: Pizza };
    loaded: boolean;
    loading: boolean;
}

export const initialState: PizzasState = {
    entities: {},
    loaded: false,
    loading: false,
};

export function reducer(
    state: PizzasState = initialState,
    action: fromPizzas.PizzasActions
): PizzasState {
    switch(action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromPizzas.LOAD_PIZZAS_SUCCESS: {
            const entities = toEntities(action.payload);

            return {
                ...state,
                entities,
                loading: false,
                loaded: true,
            };
        }

        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
            }
        }
    }

    return state;
}

export const getPizzasEntities = (state: PizzasState) => state.entities;
export const getAllPizzas = (state: PizzasState) => Object.values(state.entities);
export const getPizzasLoaded = (state: PizzasState) => state.loaded;
export const getPizzasLoading = (state: PizzasState) => state.loading;