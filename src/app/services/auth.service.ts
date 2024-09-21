import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserProfile } from '../models/userprofile';

const LOGIN_API = `${environment.rootDomain}${environment.endpoints.login}`;
const REGISTER_API = `${environment.rootDomain}${environment.endpoints.create_user}`;
const GET_USER_API = `${environment.rootDomain}${environment.endpoints.get_user}`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface LoginData {
  username: string;
  password: string;
}

interface TokenData {
  refresh: string;
  access: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userProfileSignal = signal<UserProfile | null>(null);
  refreshTokenSignal = signal<string | null>(null);
  accessTokenSignal = signal<string | null>(null);

  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<TokenData>(
        LOGIN_API,
        {
          username: username,
          password: password
        },
        httpOptions
      )
      .pipe(
        map((tokenData) => {
          this.accessTokenSignal.set(tokenData.access);
          this.refreshTokenSignal.set(tokenData.refresh);
          return tokenData;
        })
      );
  }

  getUserProfile(): Observable<any> {
    return this.http.get<UserProfile>(GET_USER_API, httpOptions).pipe(
      map((userProfile) => {
        this.userProfileSignal.set(userProfile);
        return userProfile;
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      REGISTER_API,
      {
        username: username,
        password: password
      },
      httpOptions
    );
  }

  logout(): void {
    this.userProfileSignal.set(null);
    this.refreshTokenSignal.set(null);
    this.accessTokenSignal.set(null);
  }
}
