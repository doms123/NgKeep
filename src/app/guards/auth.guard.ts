import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {


    constructor(
        private router: Router,
        public authService: AuthService
    ) {
       
    }

    canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
   
      return this.authService.isLoggedIn().then(res => {
        return true;
      }).catch(error => {
        this.router.navigate(['']);
        return false;
      });
 
    }
}