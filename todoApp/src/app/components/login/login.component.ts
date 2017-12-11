import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;

  loginForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  is_authenticating: boolean = false;
  
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.emailCtrl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
    this.passwordCtrl = new FormControl('', Validators.required);

    this.loginForm = new FormGroup({
      email: this.emailCtrl,
      password: this.passwordCtrl
    });
  }

  loginSubmit() {
    this.is_authenticating = true;
    const user = {
      email: this.email,
      password: this.password
    };

    if (this.loginForm.valid) {
      this.authService.loginUser(user).subscribe(data => {
        this.is_authenticating = false;
        if (data.success) {
          this.authService.storeUserData(data.token, data.user);
        }else {
          this.snackBar.open(data.msg, 'close', {
            duration: 3000
          });
        }
      });
    }else {
      this.is_authenticating = false;
    }
  }

  loginWithGoogle() {
    this.is_authenticating = true;
    window.location.href = "http://localhost:3000/api/google-login";
  }

  loginWithFacebook() {
    this.is_authenticating = true;
    window.location.href = "http://localhost:3000/api/facebook-login";
  }
}
