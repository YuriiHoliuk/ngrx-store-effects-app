import { Action } from '@ngrx/store';
import { NavigationExtras, Params } from '@angular/router';

export const GO = '[Router] navigate';
export const BACK = '[Router] back';
export const FORWARD = '[Router] forward';

export class Go implements Action {
  readonly type = GO;
  constructor(public payload: { url: string[], queryParams?: Params, navigationExtras?: NavigationExtras }) {}
}

export class Back implements Action {
  readonly type = BACK;
  constructor() {}
}

export class Forward implements Action {
  readonly type = FORWARD;
  constructor() {}
}

export type RouterActions = Go | Back | Forward;
