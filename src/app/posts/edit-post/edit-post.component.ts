import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';
import { getPostsById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {

  post!: Post;
  form!: FormGroup;
  postSubscription!: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.postSubscription = this.store.select(getPostsById, { id }).subscribe((data) => {
        this.post = data;
        this.form = new FormGroup({
          title: new FormControl(this.post.title, [Validators.required, Validators.minLength(3)]),
          description: new FormControl(this.post.description, [Validators.required]),
        })
      })
    })
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }

  onUpdate() {
    if (this.form.valid) {
      const post: Post = {
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
      }
      this.store.dispatch(addPost({ post }));
    }

  }
}
