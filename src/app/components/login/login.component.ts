import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userEmail:string;
  userPass:string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

  passFormControl = new FormControl('', [Validators.required]);

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {

  }

  public login() {
    this.authService.loginWithEmailAndPass(this.userEmail, this.userPass).then(userData => {
      this.toastr.success('User logged in', 'Success');
    }).catch(error => {
      this.toastr.error(error.message, 'Error');
    });
  }

  public loginGoogle() {
    this.authService.loginWithGoogle().then(googleAuth => {
      console.log(googleAuth);
    }).catch(error => {

    });
  }

  public loginFacebook() {
    this.authService.loginWithFacebook().then(facebookAuth => {
      
    }).catch(error => {

    });
  }
}
