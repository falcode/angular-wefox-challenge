import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Post } from 'core/interfaces/post';
import { takeUntil } from 'rxjs/operators';
import { UiService } from 'core/services/ui.service';
import { PostQuery } from 'core/states/post/post.query';
import { PostStoreService } from 'core/states/post/post.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  public postForm: FormGroup;
  public editingPost: Post = null;
  private destroySubject$: Subject<void> = new Subject();

  constructor(
    public uiService: UiService,
    public postStoreService: PostStoreService,
    public postQuery: PostQuery
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.setupEditingPostListener();
  }

  private initForm(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      lat: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      long: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      content: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      image_url: new FormControl('', [Validators.maxLength(200)])
    });
  }

  private setupEditingPostListener(): void {
    this.postQuery.editingPost$.pipe(takeUntil(this.destroySubject$))
    .subscribe(post => {
      this.editingPost = post;
      if (post) {
        this.postForm.patchValue({
          title: post.title,
          lat: post.lat,
          long: post.long,
          content: post.content,
          image_url: post.image_url
        });
      }
    });
  }

  public setPost(post: Post): void {
    this.postStoreService.createPost(post);
    this.postForm.reset();
    this.close();
  }

  public setEditedPost(id: number, post: Post): void {
    this.postStoreService.updatePost(id, {id, ...post});
    this.postStoreService.selectPost(id);
    this.postForm.reset();
    this.close();
  }

  public close = (): void => this.uiService.setFormDisplay(false);

  ngOnDestroy(): void {
    this.postStoreService.editPost(null);
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
