import { Post } from '@core/interfaces/post';
import { UiService } from 'core/services/ui.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { PostStoreService } from 'core/states/post/post.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() post: Post = null;
  constructor(
    public postStoreService: PostStoreService,
    public uiService: UiService
    ) { }

  ngOnInit(): void {
  }

  public editingPost(post: Post) {
    this.postStoreService.editPost(post);
    this.uiService.setFormDisplay(true);
  }

  public removePost(id: number) {
    this.postStoreService.removePost(id);
  }

}
