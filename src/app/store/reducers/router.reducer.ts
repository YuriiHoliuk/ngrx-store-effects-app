import { Params } from '@angular/router';

export interface RouterState {
    path: string;
    params: Params,
    queryParams: Params;
}

