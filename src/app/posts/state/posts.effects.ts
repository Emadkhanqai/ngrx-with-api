import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { pipe, map, mergeMap } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import { addPost, addPostSuccess, loadPost, loadPostsSuccess } from './posts.actions';


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
}
