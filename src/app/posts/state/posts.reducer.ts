import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { addPost } from "./posts.actions";
import { initialState } from "./posts.state";

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, payLoad) => {
    let post = { ...payLoad.post, id: state.posts.length + 1 }
    return {
      ...state,
      posts: [...state.posts, post]
    }
  }));

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
