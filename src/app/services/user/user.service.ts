import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/user/auth/AuthResponse';
import { SingupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SingupUserResponse } from 'src/app/models/interfaces/user/SingupUserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environments.API_URL;

  constructor(private http: HttpClient) { }

  signupUser(userDatas: SingupUserRequest): Observable<SingupUserResponse> {
    return this.http.post<SingupUserResponse>(`${this.API_URL}/user`, userDatas);
  }

  authUser(authDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth`, authDatas);
  }
}
