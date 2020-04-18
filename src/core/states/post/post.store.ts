import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Post } from '@core/interfaces/post';

export interface PostState {
  posts: Post[];
  selectedPost: Post;
}

export function createInitialState(): PostState {
  return {
    posts: [],
    selectedPost: null
  };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'post' })
export class PostStore extends Store<PostState> {

  constructor() {
    super(createInitialState());
  }

}

