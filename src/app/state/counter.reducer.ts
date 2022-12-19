import { initialState } from "./counter.state";
import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset, customIncrement } from "./counter.actions";

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1
    }
  }),
  on(decrement, (state) => {
    return {
      ...state,
      counter: state.counter - 1
    }
  }),
  on(reset, (state) => {
    return {
      ...state,
      counter: 0
    }
  }),
  on(customIncrement, (state, payLoad) => {
    return {
      ...state,
      counter: payLoad.value
    }
  }));

export function counterReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
