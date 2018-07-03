import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthComponent } from './auth.component';
import { LoginGuard } from './guards/login.guard';


@NgModule({
	imports: [
		RouterModule.forChild([
      {
        path: '', component: AuthComponent,
        children: [
          {path: '', pathMatch: 'full', redirectTo: 'login'},
          {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
          {path: 'register', component: RegistrationComponent, canActivate: [LoginGuard]},
          {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginGuard]},
          {path: 'password-recovery', component: ResetPasswordComponent}
        ]
      }
    ])
	],
	exports: [RouterModule],
	declarations: [],
	providers: [LoginGuard]
})
export class AuthRoutingModule {
}
