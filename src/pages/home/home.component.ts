import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostStoreService } from '@core/states/post/post.service';
import { UiService } from '@core/services/ui.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PostQuery } from '@core/states/post/post.query';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public displayForm = false;
  private destroySubject$: Subject<void> = new Subject();
  constructor(
    private postService: PostStoreService,
    public postQuery: PostQuery,
    public uiService: UiService) { }

  ngOnInit(): void {
    this.uiService.displayForm.pipe(takeUntil(this.destroySubject$))
      .subscribe((display: boolean) => this.displayForm = display);
    this.postService.listAllPosts();
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }


}
