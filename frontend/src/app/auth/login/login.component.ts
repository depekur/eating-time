import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { patterns, counts } from '../../shared/form-patterns';
import { validationMessages } from '../../shared/form-errors';
import { JwtService } from '../../shared/services/jwt.service';
import { CustomValidations } from '../../shared/custom-validation';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../auth.model';
import { Router } from '@angular/router';
import {UserService} from "../../shared/services/user.service";
import {APP_EVENTS, IAppState} from "../../store";
import {NgRedux} from "@angular-redux/store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = validationMessages;
  isSending: boolean = false;
  authError: string = null;

  constructor(private customValidations: CustomValidations,
              private authService: AuthService,
              private jwtService: JwtService,
              private userService: UserService,
              private ngRedux: NgRedux<IAppState>,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(counts.email.maxLength),
          Validators.minLength(counts.email.minLength),
          Validators.pattern(patterns.email)
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(counts.password.maxLength),
          Validators.minLength(counts.password.minLength),
          this.customValidations.passwordPattern
        ])
    },
    { updateOn: 'blur' }
    );
  }

  onSubmit() {
    if (!this.loginForm.valid) { return; }

    this.isSending = true;

    this.authService.loginRequest(this.loginForm.value)
      .subscribe(
        (data: LoginResponse) => {
          this.jwtService.setToken(data.token);
          this.ngRedux.dispatch({ type: APP_EVENTS.LOGIN });
          this.userService.getUser();

          this.router.navigate(['/recipe/all']);
        },
        error => {
          this.loginForm.reset({
            email: this.loginForm.value.email,
            password: ''
          });

          this.authError = this.catchError(error);

          // todo show error message

          this.isSending = false;
        });
  }

  catchError(error): string {
    return Object.keys(error.error)
      .map(key => error.error[key])
      .join('; ');
  }


  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

}




