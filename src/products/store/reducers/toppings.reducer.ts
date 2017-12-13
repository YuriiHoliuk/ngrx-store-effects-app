import { Topping } from './../../models/topping.model';
import * as fromToppings from '../actions/toppings.action';
import { toEntities } from '../../../utils/toEntities';

export interface ToppingsState {
    entities: { [key: number]: Topping };
    loaded: boolean;
    loading: boolean;
    selectedToppings: number[];
}

export const initialState: ToppingsState = {
    entities: {},
    loaded: false,
    loading: false,
    selectedToppings: [],
};

export function reducer(
    state: ToppingsState = initialState,
    action: fromToppings.ToppingsActions
): ToppingsState {
    switch(action.type) {
        case fromToppings.LOAD_TOPPINGS: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromToppings.LOAD_TOPPINGS_SUCCESS: {
            const entities = toEntities(action.payload);

            return {
                ...state,
                entities,
                loading: false,
                loaded: true,
            };
        }

        case fromToppings.LOAD_TOPPINGS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false,
            };
        }

        case fromToppings.SELECT_TOPPINGS: {
            const selectedToppings = action.payload;

            return {
                ...state,
                selectedToppings,
            };
        }
    }

    return state;
}

export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
