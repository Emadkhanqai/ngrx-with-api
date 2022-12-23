import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePostSuccess, loadPostsSuccess, updatePostSuccess } from "./posts.actions";
import { initialState } from "./posts.state";

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostSuccess, (state, payLoad) => {
    let updatedPost = state.posts.map(post => {
      return payLoad.post.id === post.id ? payLoad.post : post;
    });
    return {
      ...state,
      posts: updatedPost
    }
  }),
  on(deletePostSuccess, (state, { id }) => {
    let deletedPost = state.posts.filter(post => {
      return id !== post.id;
    });
    return {
      ...state,
      posts: deletedPost
    }
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
