import { take } from 'rxjs/operators';
import { PostStore } from './post.store';
import { Injectable } from '@angular/core';
import { Post } from '@core/interfaces/post';
import { PostService } from '@core/services/post.service';
import { arrayUpdate, arrayRemove, arrayAdd } from '@datorama/akita';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostStoreService {

  constructor(private postStore: PostStore, private postService: PostService) {
  }
  // STORE INTERACTION FUNCTIONS
  private updateAllPosts = (posts: Post[]) =>
    this.postStore.update({ posts })

  private updateUniquePost = (post: Post) =>
    this.postStore.update(state => ({
      posts: arrayUpdate(state.posts, post.id, post)
    }))

  private addPost = (post: Post) =>
    this.postStore.update(state => ({
      posts: arrayAdd(state.posts, post)
    }))

  private updateSelectedPost = (selectedPost: Post) =>
    this.postStore.update({ selectedPost })

  private removeUniquePost = (id: number) =>
    this.postStore.update(state => ({
      posts: arrayRemove(state.posts, [id])
    }))

  // API INTERACTION FUNCTIONS
  public listAllPosts = (): Subscription =>
    this.postService.list().pipe(take(1))
      .subscribe((posts: Post[]) => this.updateAllPosts(posts))

  public selectPost = (id: number): Subscription =>
    this.postService.show(id).pipe(take(1))
      .subscribe((post: Post) => this.updateSelectedPost(post))

  public createPost = (post: Post): Subscription =>
    this.postService.create(post).pipe(take(1))
      .subscribe((newPost: Post) => this.addPost(newPost))

  public updatePost = (id: number, post: Post): Subscription =>
    this.postService.update(id, post).pipe(take(1))
      .subscribe((updatedPost: Post) => this.updateUniquePost(updatedPost))

  public removePost = (id: number): Subscription =>
    this.postService.remove(id).pipe(take(1))
      .subscribe(() => this.removeUniquePost(id))
}