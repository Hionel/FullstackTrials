import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  registerEmail?: string;
  registerName?: string;
  registerPassword?: string;
  submitRegisterFormHanlder = () => {
    console.log('Here');
    const userRegistrationData = {
      email: this.registerEmail,
      fullname: this.registerName,
      password: this.registerPassword,
    };
    console.log(userRegistrationData);
  };
}
