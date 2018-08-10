import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from "@angular-redux/store";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @select() readonly isLoggedIn: Observable<boolean>;
  @select(['user', 'name']) readonly userName: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
