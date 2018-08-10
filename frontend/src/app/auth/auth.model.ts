export class LoginFormData {
  email: string;
  password: string;

  constructor({email, password}) {
    this.email = email.trim();
    this.password = password.trim();
  }
}

export class RegisterFormData {
  name: string;
  email: string;
  password: string;

  constructor({name, email, password}) {
    this.name = name.trim();
    this.email = email.trim();
    this.password = password.trim();
  }
}

export interface ILoginResponse {
  token: string;
}
