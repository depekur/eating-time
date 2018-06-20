import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

	setToken(token: string) {
		localStorage.setItem('token', token);
	};

	getToken(): string {
		return localStorage.getItem('token');
	}

	hasToken(): boolean {
		return !!this.getToken();
	}

	deleteToken() {
		localStorage.removeItem('token');
	}

}
