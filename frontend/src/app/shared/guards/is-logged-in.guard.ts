import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {AuthService} from "../../auth/auth.service";

@Injectable()
export class IsLoggedInGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {

      console.log('IsLoggedInGuard true');
      return true;
    } else {

      console.log('IsLoggedInGuard false');
      return true;
    }
  }
}
