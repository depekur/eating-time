import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {apiUrls} from "../../app-config";
import { IAppState, APP_EVENTS } from "../../store";
import {NgRedux} from "@angular-redux/store";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private ngRedux: NgRedux<IAppState>) {
  }

  getUser() {
    return this.http.get(apiUrls.userInfo).subscribe(
      user => {
        this.ngRedux.dispatch({ type: APP_EVENTS.SAVE_USER, body: user });

        return user;
      },
      error => {
        console.warn(error);
      }
    );
  }
}
