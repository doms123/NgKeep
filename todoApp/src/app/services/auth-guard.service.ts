import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(): boolean {
    let user = localStorage.getItem('user');
    if(user != null) {
      return true;
    }else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
