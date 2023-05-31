import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarNotificationService } from './snackbar-notification.service';
import { CookiesService } from './cookies.service';
import { IResponse } from '../interfaces/iresponse';

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
      .then((response) => {
        return response.json();
      })
      .then((result: IResponse) => {
        if (!result.success) {
          return this.snackbarService.openErrorSnack(result.msg!);
        }
        this.snackbarService.openSuccessSnack(result.msg!);
        this.router.navigate(['/auth/login']);
      })
      .catch((error) => {
        return this.snackbarService.openErrorSnack(error);
      });
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
        const token = response.headers.get('Accesstoken');
        const expiryTime = response.headers.get('Expirytime');
        this.cookieService.setTokenCookie(token!, expiryTime!);
        return response.json();
      })
      .then((result: IResponse) => {
        if (!result.success) {
          return this.snackbarService.openErrorSnack(result.msg!);
        }
        this.snackbarService.openSuccessSnack(result.msg!);
        this.router.navigate(['/home']);
      })
      .catch((error) => this.snackbarService.openErrorSnack(error.msg!));
  };
}
