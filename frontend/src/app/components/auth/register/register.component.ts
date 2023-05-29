import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import CustomValidators from 'src/app/auth-utils/customValidations';
import PasswordVisibilityToogler from 'src/app/auth-utils/passwordVisibilityToogler';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}
  passwordRegex = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])'
  );
  public registerPasswordsVisibility: boolean = false;
  public confirmPasswordsVisibility: boolean = false;
  public tooglePasswordVisibility(field: string, visibilityStatus: boolean) {
    if (field === 'password') {
      this.registerPasswordsVisibility =
        PasswordVisibilityToogler.tooglePasswordVisibility(
          field,
          visibilityStatus
        );
    }
    if (field === 'confirmPassword') {
      this.confirmPasswordsVisibility =
        PasswordVisibilityToogler.tooglePasswordVisibility(
          field,
          visibilityStatus
        );
    }
  }
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),

      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(65),
      ]),
    },
    [CustomValidators.matchPasswords('password', 'confirmPassword')]
  );

  submitForm() {
    this.authService.postRegistrationData(this.registerForm);
  }
}
