import { Component, OnInit } from '@angular/core';
import { PostQuery } from '@core/states/post/post.query';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(public postQuery: PostQuery) { }

  ngOnInit(): void {
  }

}
