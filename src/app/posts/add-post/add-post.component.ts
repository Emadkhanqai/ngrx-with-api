import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  form!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required]),
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const post: Post = {
        id: '',
        title: this.form.get('title')?.value,
        description: this.form.get('description')?.value,
      }
      this.store.dispatch(addPost({ post }));
      this.form.reset();
    }
  }

}
