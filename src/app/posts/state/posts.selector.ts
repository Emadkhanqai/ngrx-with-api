import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./posts.state";

const getPostsState = createFeatureSelector<PostState>('posts')

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
})

export const getPostsById = createSelector(getPostsState, (state: any, props: any) => {
  return state.posts.find((post: any) => post.id === props.id);
})
