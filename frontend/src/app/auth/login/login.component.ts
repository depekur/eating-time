import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { patterns, counts } from '../../shared/form-patterns';
import { validationMessages } from '../../shared/form-errors';
import { JwtService } from '../../services/jwt.service';
import { CustomValidations } from '../../shared/custom-validation';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../model/auth.model';
import { Router } from '@angular/router';

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

    this.authService.login(this.loginForm.value)
      .subscribe(
        (data: LoginResponse) => {
          console.log(data);

          this.jwtService.setToken(data.token);

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




