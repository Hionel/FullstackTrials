import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import PasswordVisibilityToogler from 'src/app/auth-utils/passwordVisibilityToogler';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginPasswordsVisibility: boolean = false;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  public tooglePasswordVisibility(field: string, visibilityStatus: boolean) {
    this.loginPasswordsVisibility =
      PasswordVisibilityToogler.tooglePasswordVisibility(
        field,
        visibilityStatus
      );
  }
  submitLogin() {
    this.authService.loginUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
