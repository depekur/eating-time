import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {JwtService} from "./shared/services/jwt.service";
import {Router} from "@angular/router";

import 'rxjs/add/operator/catch';
import {AuthService} from "./auth/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService,
              private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const clonedRequest = this.authService.isLoggedIn()
          ? req.clone({
              headers: req.headers
                            .set('Accept', 'application/json')
                            .set('Authorization', `Bearer ${this.jwtService.getToken()}`)
            })
          : req;

    //console.log('JwtInterceptor');


    return next.handle(clonedRequest)
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.jwtService.deleteToken();

            this.router.navigate(['/auth/login']);
          }

          return Observable.throw(err);
        }
      });
  }
}
