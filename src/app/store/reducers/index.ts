import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, RouterStateSerializer, routerReducer } from '@ngrx/router-store';

export interface RouterStateUrl {
    url: string;
    params: Params,
    queryParams: Params;
}

export interface State {
    routerReducer: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: routerReducer,
}

export const getRouterReducerState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

export const getRouterState = createSelector(
    getRouterReducerState,
    (state: RouterReducerState<RouterStateUrl>) => state.state
);

export const getRouterUrl = createSelector(
    getRouterState,
    (state: RouterStateUrl) => state.url
);

export const getRouterParams = createSelector(
    getRouterState,
    (state: RouterStateUrl) => state.params
);

export const getRouterQueryParams = createSelector(
    getRouterState,
    (state: RouterStateUrl) => state.queryParams
);

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild
        }
        const { params } = state;

        return { url, params, queryParams };
    }
}