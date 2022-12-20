import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { deletePost } from '../state/posts.actions';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts!: Post[];
  search!: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(getPosts).subscribe((data) => this.posts = data);
  }

  deletePost(id: any) {
    this.store.dispatch(deletePost({ id }));
  }

  searchTable() {
    const search = [...this.posts];
    const query =
      search.filter((x: any) => x.title.trim().toLowerCase().includes(this.search.trim().toLowerCase()));
    if (query.length > 0) {
      this.posts = query;
    } else {
      this.posts = search;
    }
  }

}
