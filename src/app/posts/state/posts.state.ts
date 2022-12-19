import { Post } from "src/app/models/posts.model"

export interface PostState {
  posts: Post[]
}

export const initialState: PostState = {
  posts: [
    {
      id: '1', title: 'sample', description: 'wahahahahah'
    },
    {
      id: '2', title: 'hahah', description: 'xxxxxxx'
    }
  ]
}
