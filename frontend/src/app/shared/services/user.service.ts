import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from "../../app-config";
import {IAppState, APP_EVENTS} from "../../store";
import {NgRedux} from "@angular-redux/store";

interface IUserResponse {
  user: any;
  settings: any;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private ngRedux: NgRedux<IAppState>) {
  }

  getUser() {
    return this.http.get(apiUrls.userInfo).subscribe(
      (userData: IUserResponse) => {
        this.ngRedux.dispatch({type: APP_EVENTS.SAVE_USER, body: userData.user});
        this.ngRedux.dispatch({type: APP_EVENTS.SAVE_SETTINGS, body: userData.settings.eating_time});

        return userData.user;
      },
      error => {
        console.error(error);
      }
    );
  }
}
