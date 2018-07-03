import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {NgRedux, select} from "@angular-redux/store";
import { UserService } from "./shared/services/user.service";
import {AuthService} from "./auth/auth.service";
import {APP_EVENTS, IAppState} from "./store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @select() readonly user: Observable<any>;

  constructor(private userService: UserService,
              private authService: AuthService,
              private ngRedux: NgRedux<IAppState>
              ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.userService.getUser();

      this.ngRedux.dispatch({ type: APP_EVENTS.LOGIN });
    } else {
      this.ngRedux.dispatch({ type: APP_EVENTS.LOGOUT });
    }
  }
}
