import { postsReducer } from "../posts/state/posts.reducer";
import { PostState } from "../posts/state/posts.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";

export interface AppState {
  counter: CounterState,
  posts: PostState
  // add new states here
}

export const appReducer =
{
  counter: counterReducer,
  posts: postsReducer
}
