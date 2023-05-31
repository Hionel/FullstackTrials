import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private router: Router, private cookiesService: CookiesService) {
    this.cookiesService.deleteCookie();
    this.router.navigate(['auth/login']);
  }
}
