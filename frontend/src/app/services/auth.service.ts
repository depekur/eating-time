import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { JwtService } from './jwt.service';
import { LoginFormData, LoginResponse, RegisterFormData } from '../model/auth.model';
import { apiUrls } from '../app-config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private jwtService: JwtService) { }

  register({name, email, password}): Observable<Object> {
    const data = new RegisterFormData({name, email, password});

    return this.http.post(apiUrls.register, data);
  }

  login({email, password}): Observable<Object> {
    const data = new LoginFormData({email, password});

    return this.http.post(apiUrls.login, data);
  }
}
