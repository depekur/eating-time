import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { JwtService } from '../shared/services/jwt.service';
import { LoginFormData, LoginResponse, RegisterFormData } from './auth.model';
import { apiUrls } from '../app-config';
import {Router} from "@angular/router";
import {APP_EVENTS, IAppState} from "../store";
import {NgRedux} from "@angular-redux/store";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private jwtService: JwtService,
              private ngRedux: NgRedux<IAppState>,
              private router: Router) { }

  register({name, email, password}): Observable<Object> {
    const data = new RegisterFormData({name, email, password});

    return this.http.post(apiUrls.register, data);
  }

  login(token: string): void {
    this.jwtService.setToken(token);
    this.ngRedux.dispatch({ type: APP_EVENTS.LOGIN });
  }

  loginRequest({email, password}): Observable<Object> {
    const data = new LoginFormData({email, password});

    return this.http.post(apiUrls.login, data);
  }

  logout(): void {
    this.jwtService.deleteToken();
    this.ngRedux.dispatch({ type: APP_EVENTS.LOGOUT });

    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.jwtService.hasToken();
  }
}
