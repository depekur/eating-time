import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { patterns, counts } from '../../shared/form-patterns';
import { JwtService } from '../../shared/services/jwt.service';
import { validationMessages } from '../../shared/form-errors';
import { CustomValidations } from '../../shared/custom-validation';
import { ILoginResponse } from '../auth.model';
import {APP_EVENTS, IAppState} from "../../store";
import {NgRedux} from "@angular-redux/store";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  errors = validationMessages;
  isSending: boolean = false;
  authError: string = null;

  constructor(private customValidations: CustomValidations,
              private authService: AuthService,
              private jwtService: JwtService,
              private ngRedux: NgRedux<IAppState>,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
        name: new FormControl('',
          [
            Validators.required,
            Validators.maxLength(counts.name.maxLength),
            Validators.minLength(counts.name.minLength),
            Validators.pattern(patterns.name)
          ]),
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

  onChange() {
    this.authError = null;
  }

  onSubmit() {
    if (!this.registerForm.valid) { return; }

    this.isSending = true;

    this.authService.register(this.registerForm.value)
      .subscribe(
        (data: ILoginResponse) => {
          this.jwtService.setToken(data.token);
          this.ngRedux.dispatch({ type: APP_EVENTS.LOGIN });
          this.userService.getUser();

          this.isSending = false;
          this.router.navigate(['/recipe/all']);
        },
        error => {
          this.registerForm.reset({
            name: this.registerForm.value.name,
            email: this.registerForm.value.email,
            password: ''
          });

          this.authError = this.catchError(error);

          this.isSending = false;
        });
  }

  catchError(error): string {
    return Object.keys(error.error)
            .map(key => error.error[key])
            .join('; ');
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

}
