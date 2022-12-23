import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, map, mergeMap, switchMap } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPost, loadPostsSuccess, updatePost, updatePostSuccess } from './posts.actions';


@Injectable()
export class PostEffects {
  constructor(private action$: Actions, private postsService: PostService) {
  }

  loadPosts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadPost),
      mergeMap((action) => {
        return this.postsService.getPosts()
          .pipe(
            map((posts) => {
              return loadPostsSuccess({ posts });
            })
          );
      })
    );
  });

  addPost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post });
          })
        )
      })
    )
  })

  deletePost$ = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        )
      })
    )
  })
}
