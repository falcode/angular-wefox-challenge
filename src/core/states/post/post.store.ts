import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Post } from '@core/interfaces/post';

export interface PostState {
  posts: Post[];
  selectedPost: Post;
  editingPost: Post;
  loading: boolean;
}

export function createInitialState(): PostState {
  return {
    posts: [],
    selectedPost: null,
    editingPost: null,
    loading: false,
  };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'post' })
export class PostStore extends Store<PostState> {

  constructor() {
    super(createInitialState());
  }

}

