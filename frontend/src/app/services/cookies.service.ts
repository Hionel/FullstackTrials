import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import jwt_decode from 'jwt-decode';
import { IUser } from '../interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookie: CookieService) {}
  userID!: string;
  setTokenCookie = (token: string, time: string) => {
    return this.cookie.put('token', token, { expires: time });
  };
  getTokenCookie = () => {
    const encodedToken = this.cookie.get('token');
    const decodedData = jwt_decode(encodedToken!) as IUser;
    this.userID = decodedData._id;
  };
  deleteCookie() {}
  checkCookie() {}
}
