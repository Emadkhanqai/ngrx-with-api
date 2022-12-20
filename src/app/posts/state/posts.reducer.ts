import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { addPost, deletePost, updatePost } from "./posts.actions";
import { initialState } from "./posts.state";

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state, payLoad) => {
    let post = { ...payLoad.post, id: state.posts.length + 1 }
    return {
      ...state,
      posts: [...state.posts, post]
    }
  }),
  on(updatePost, (state, payLoad) => {
    let updatedPost = state.posts.map(post => {
      return payLoad.post.id === post.id ? payLoad.post : post;
    });
    return {
      ...state,
      posts: updatedPost
    }
  }),
  on(deletePost, (state, {id}) => {
    let deletedPost = state.posts.filter(post => {
      return id !== post.id;
    });
    return {
      ...state,
      posts: deletedPost
    }
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
