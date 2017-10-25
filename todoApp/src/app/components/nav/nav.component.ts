import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
  refreshClick() {
    this.snackbar.open('Page was refresh', 'close', {
      duration: 3000
    });
  }

  logoutClick() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
}
