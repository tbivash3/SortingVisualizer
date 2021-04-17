import { Action, ActionType, createReducer, on } from '@ngrx/store';
import { sortType } from './sort.actions';

export const initialState: number[] = [];

const _sortReducer = createReducer(
  initialState,
  on(sortType, (state, props) => props.data)
);

export function sortReducer(state: number[] | undefined, action: Action) {
  return _sortReducer(state, action);
}
