import { createAction, props } from '@ngrx/store';

export const sortType = createAction(
  '[Sort Component] Type',
  props<{ data: number[] }>()
);
