import { Component, OnInit } from '@angular/core';
import {select} from "@angular-redux/store";
import {Observable} from "rxjs/Rx";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @select() readonly isLoggedIn: Observable<boolean>;
  @select(['user', 'name']) readonly userName: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
