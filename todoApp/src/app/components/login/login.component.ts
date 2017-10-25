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
  

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(EMAIL_REGEX)]);

  // passFormControl = new FormControl('', [Validators.required]);

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
    const user = {
      email: this.email,
      password: this.password
    }

    if(this.loginForm.valid) {
      this.authService.loginUser(user).subscribe(data => {
        if(data.success) {
          this.authService.storeUserData(data.token, data.user);
          this.router.navigate(['home']);
        }else {
          this.snackBar.open('Invalid Email or Passowrd!', 'close', {
            duration: 3000
          });
        }
      });
    }
  }
}
