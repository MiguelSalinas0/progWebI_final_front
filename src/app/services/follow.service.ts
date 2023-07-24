import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private baseURL: string = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  evalFollow(user_id: string, followed_user_id: string): Observable<any> {
    const body = {
      user_id: user_id,
      followed_user_id: followed_user_id
    }
    return this._http.post<any>(this.baseURL + '/follow/eval', body)
  }

  addFollow(user_id: string, followed_user_id: string): Observable<any> {
    const body = {
      user_id: user_id,
      followed_user_id: followed_user_id
    }
    return this._http.post<any>(this.baseURL + '/follow/add', body)
  }

  removeFollow(user_id: string, followed_user_id: string): Observable<any> {
    return this._http.delete<any>(this.baseURL + '/follow/remove/' + user_id + '/' + followed_user_id)
  }
}

