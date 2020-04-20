import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { PostStore, PostState } from './post.store';

@Injectable({
  providedIn: 'root'
})
export class PostQuery extends Query<PostState> {
  public posts$ = this.select('posts');
  public selectedPost$ = this.select('selectedPost');
  public loading$ = this.select('loading');
  public editingPost$ = this.select('editingPost');


  constructor(protected store: PostStore) {
    super(store);
  }

}
