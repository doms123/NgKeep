import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isloggedIn:boolean;
  profilePhoto:string;
  baseUrl:string = "http://localhost:3000/";
  
  constructor(
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      let user = localStorage.getItem('user');

      if(user != null) {
        this.isloggedIn = true;
        this.profileService.userLogData().subscribe(userData => {
          this.profilePhoto = userData.data[0].photo;
        });
      }else {
        this.isloggedIn = false;
      }
    }, 400);
  }

  refreshClick() {
    this.snackbar.open('Page was refresh', 'close', {
      duration: 3000
    });
  }

  logoutClick() {
    this.authService.logoutUser();
    window.location.href = "/";
  }
}
