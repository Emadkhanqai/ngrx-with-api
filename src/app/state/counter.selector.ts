import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

// First step, isme bracket me woh value ayegi jo app module me likhi thi
const getCounterState = createFeatureSelector<CounterState>('counter');

// Second step
export const getCounter = createSelector(getCounterState, state => {
  return state.counter;
})

export const getChannelName = createSelector(getCounterState, state => {
  return state.channelName;
})
