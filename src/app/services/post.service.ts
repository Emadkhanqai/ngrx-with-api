import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient, private store: Store<AppState>) { }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get('https://vue-completecourse.firebaseio.com/posts.json')
      .pipe(
        map((data: any) => {
          const post: Post[] = [];
          for (let key in data) {
            post.push({ ...data[key], id: key });
          }
          return post;
        }));
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.httpClient.post<{ name: string }>('https://vue-completecourse.firebaseio.com/posts.json', post);
  }
}
