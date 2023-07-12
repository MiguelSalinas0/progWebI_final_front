import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private baseURL: string = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  evalLike(user_id: string, post_id: string) {
    const body = {
      user_id: user_id,
      post_id: post_id
    }
    return this._http.post<any>(this.baseURL + '/like/eval', body)
  }
}
