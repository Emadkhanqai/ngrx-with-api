export const initialState: CounterState = {
  counter: 4,
  channelName: 'Future Leaders'
};

export interface CounterState {
  counter: number,
  channelName: string
}
