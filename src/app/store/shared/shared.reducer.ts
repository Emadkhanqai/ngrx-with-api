
import { createReducer, on } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner, setSuccessMessage } from './shared.action';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state: any, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
  on(setSuccessMessage, (state: any, action) => {
    return {
      ...state,
      successMessage: action.message,
    };
  })
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
