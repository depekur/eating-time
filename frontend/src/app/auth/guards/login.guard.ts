import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {JwtService} from '../../services/jwt.service';

@Injectable()
export class LoginGuard implements CanActivate {

	constructor(private jwtService: JwtService,
							private router: Router) {
	}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		if (this.jwtService.hasToken()) {

			//this.router.navigate(['/writer-room']);

			return true;
		} else {

			return true;
		}
  }
}
