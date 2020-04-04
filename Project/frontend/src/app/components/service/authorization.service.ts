import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserToken} from '../model/user-token';
import {User} from '../model/user';

const URL_PREFIX: string = 'api/user';

@Injectable()
export class AuthorizationService {

  constructor(private http: HttpClient) {
  }

  public authorizeUser(userModel: User): Observable<UserToken> {
    const json = JSON.stringify(userModel);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.http.post<UserToken>(URL_PREFIX + '/login', json, options);
  }

  public registerUser(user: User): Observable<UserToken> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = {headers: headers};
    return this.http.post<UserToken>(URL_PREFIX + '/register', json, options);
  }



}
