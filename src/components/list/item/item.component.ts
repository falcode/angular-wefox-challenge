import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@core/interfaces/post';
import { PostStoreService } from '@core/states/post/post.service';
import { UiService } from '@core/services/ui.service';

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

  public editingPost(event: Event, post: Post) {
    event.stopPropagation();
    this.postStoreService.editPost(post);
    this.uiService.setFormDisplay(true);
  }

  public removePost(event: Event, id: number) {
    event.stopPropagation();
    this.postStoreService.removePost(id);
  }

}
