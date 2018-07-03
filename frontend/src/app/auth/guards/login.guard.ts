import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {JwtService} from '../../shared/services/jwt.service';
import {NgRedux} from "@angular-redux/store";
import {IAppState, APP_EVENTS} from "../../store";

@Injectable()
export class LoginGuard implements CanActivate {

	constructor(private jwtService: JwtService,
							private router: Router,
              private ngRedux: NgRedux<IAppState>) {
	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.jwtService.hasToken()) {
      this.ngRedux.dispatch({ type: APP_EVENTS.LOGIN });
      this.router.navigate(['/recipe/all']);

      return false;
		} else {
      this.ngRedux.dispatch({ type: APP_EVENTS.LOGOUT });

			return true;
		}
  }
}
