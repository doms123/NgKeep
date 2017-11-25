import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  email: string;
  password: string;

  registerForm: FormGroup;
  nameCtrl: FormControl;
  emailCtrl: FormControl;
  passCtrl: FormControl;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.nameCtrl = new FormControl('', Validators.required);
    this.emailCtrl = new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]);
    this.passCtrl = new FormControl('', Validators.required);

    this.registerForm = new FormGroup({
      name: this.nameCtrl,
      email: this.emailCtrl,
      password: this.passCtrl
    });
  }

  registerSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    if (this.registerForm.valid) {
      this.authService.registerUser(user).subscribe( data => {
        if (data.success) {
          this.registerForm.reset();
          this.snackBar.open('You are now registered', 'close', {
            duration: 3000
          });

          this.router.navigate(['']);

        }else {
          alert('error');
        }
      });
    }
  }
}
