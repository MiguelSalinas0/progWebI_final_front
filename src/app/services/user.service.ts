import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Login } from '../interfaces/login';
import { Follow } from '../interfaces/follow';
import { PostUser } from '../interfaces/postuser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  getOneUser(id: string): Observable<User> {
    return this._http.get<User>(this.baseURL + '/user/getuser/' + id)
  }

  getSeguidoresYSeguidos(id: string): Observable<Follow> {
    return this._http.get<Follow>(this.baseURL + '/user/getfollowers/' + id)
  }

  getPostUser(id: string): Observable<PostUser> {
    return this._http.get<PostUser>(this.baseURL + '/post/getallpostuser/' + id)
  }

  login(email: string, password: string): Observable<Login> {
    const body = {
      email: email,
      password: password
    }
    return this._http.post<Login>(this.baseURL + '/user/login', body)
  }

  update(nombre: string, apellido: string, correo_electronico: string, biografia: string, id: number): Observable<any> {
    const body = {
      nombre: nombre,
      apellido: apellido,
      correo_electronico: correo_electronico,
      biografia: biografia
    }
    return this._http.put<any>(this.baseURL + '/user/update/ ' + id, body)
  }

}
