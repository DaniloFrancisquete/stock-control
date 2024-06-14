import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRequest } from 'src/app/models/user/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/user/auth/AuthResponse';
import { SignupUserRequest } from 'src/app/models/user/interfaces/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/user/interfaces/SignupUserResponse';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  signupUser(requestDatas: SignupUserRequest): Observable <SignupUserResponse>{
    return this.http.post<SignupUserResponse>(
      `${this.API_URL}/user`,
      requestDatas
    );
  }

  authUser(requestDatas: AuthRequest): Observable <AuthResponse> {
return this.http.post<AuthResponse>(`${this.API_URL}/auth`,requestDatas)
  }
}
