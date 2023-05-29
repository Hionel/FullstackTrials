import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarNotificationService } from './snackbar-notification.service';
import { CookiesService } from './cookies.service';

interface IResponse {
  status: string;
  msg?: string;
  token?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private snackbarService: SnackbarNotificationService,
    private cookieService: CookiesService
  ) {}
  postRegistrationData = (registerFormData: FormGroup) => {
    const userData: IUser = registerFormData.value;

    const raw = JSON.stringify({
      userData,
    });

    fetch('http://localhost:4100/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: raw,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status != 'Success') {
          return this.snackbarService.openErrorSnack(result.msg!);
        }
        this.router.navigate(['/auth/login']);
      })
      .catch((error) => console.log('error', error));
  };

  loginUser = (emailInput: string, passwordInput: string) => {
    const loginData = {
      email: emailInput,
      password: passwordInput,
    };

    const raw = JSON.stringify({
      loginData,
    });

    fetch('http://localhost:4100/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: raw,
    })
      .then((response) => {
        console.log(response);
        const token = response.headers.get('Accesstoken');
        this.cookieService.setTokenCookie(token!);
        return response.json();
      })
      .then((result: IResponse) => {
        console.log(result);
        if (result.status != 'Success') {
          return this.snackbarService.openErrorSnack(result.msg!);
        }
        this.router.navigate(['/home']);
      })
      .catch((error) => this.snackbarService.openErrorSnack(error.msg!));
  };
}
