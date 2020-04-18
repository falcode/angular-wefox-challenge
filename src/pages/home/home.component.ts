import { Component, OnInit } from '@angular/core';
import { PostStoreService } from '@core/states/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private postService: PostStoreService) { }

  ngOnInit(): void {
    this.postService.listAllPosts();
  }

}
