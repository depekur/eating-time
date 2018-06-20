import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { patterns, counts } from '../../shared/form-patterns';
import { JwtService } from '../../services/jwt.service';
import { validationMessages } from '../../shared/form-errors';
import { CustomValidations } from '../../shared/custom-validation';
import { LoginResponse } from '../../model/auth.model';

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
        (data: LoginResponse) => {
          console.log(data);

          this.jwtService.setToken(data.token);

          //this.router.navigate(['/menu']);
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
