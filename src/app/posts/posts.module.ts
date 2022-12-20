import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from './posts-list/posts-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/posts.reducer';

const routes: Routes = [

  {
    path: '',
    component: PostsComponent,
    children: [
      {
        path: 'add',
        component: AddPostComponent
      },
      {
        path: 'edit/:id',
        component: EditPostComponent
      }
    ]
  }
];

@NgModule({
  declarations: [PostsComponent, AddPostComponent, EditPostComponent, PostsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    StoreModule.forFeature('posts', postsReducer),
    RouterModule.forChild(routes)
  ]
})
export class PostsModule { }
