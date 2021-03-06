import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http: Http
  ) { }

  registerUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/register', user, {headers: headers})
      .map(res => res.json());
  }

  loginUser(user) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/login', user, {headers: headers})
      .map(res => res.json());
  }

  storeUserData(token: any, user: object) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    window.location.href = "/home";
  }

  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/api/profile', {headers: headers})
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  registerEmailVerification(user) {
    console.log(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/register-email-verification', user, {headers: headers})
      .map(res => res.json());
  }

  loginWithGoogle() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get('http://localhost:3000/api/google-login', {headers: headers})
      .map(res => res.json());
  }
}
