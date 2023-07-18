import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostserviceService {

  private baseURL: string = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  getAllPost(): Observable<Post> {
    return this._http.get<Post>(this.baseURL + '/post/getall')
  }

  addPost(user_id: string | null, contenido: string): Observable<any> {
    const body = {
      user_id: user_id,
      contenido: contenido
    }
    return this._http.post(this.baseURL + '/post/add', body)
  }

  updatePost(post_id: string | null, contenido: string): Observable<any> {
    const body = {
      post_id: post_id,
      contenido: contenido
    }
    console.log(body)
    return this._http.put<any>(this.baseURL + '/post/update', body)
  }

  deletePost(post_id: string): Observable<any> {
    return this._http.delete<any>(this.baseURL + '/post/remove/' + post_id)
  }

  addComment(user_id: string | null, post_id: string, contenido: string) {
    const body = {
      user_id: user_id,
      post_id: post_id,
      contenido: contenido
    }
    return this._http.post(this.baseURL + '/post/addcomment', body)
  }

}
