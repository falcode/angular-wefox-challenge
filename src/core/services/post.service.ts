import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '@core/interfaces/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
    private postsURL = 'https://wf-challenge-d6haqugtoo.herokuapp.com/api/v1/posts';

    constructor(private http: HttpClient) { }

    // API INTERACTION FUNCTIONS
    public list = (): Observable<Post[]> =>
        this.http.get<Post[]>(this.postsURL)

    public show = (id: number): Observable<Post> =>
        this.http.get<Post>(`${this.postsURL}/${id}`)

    public create = (post: Post): Observable<Post> =>
        this.http.post<Post>(this.postsURL, post)

    public update = (id: number, post: Post): Observable<Post> =>
        this.http.post<Post>(`${this.postsURL}/${id}`, post)

    public remove = (id: number): Observable<any> =>
        this.http.delete(`${this.postsURL}/${id}`)
}
