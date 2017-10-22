import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName: string;
  userEmail: string;
  userPass: string;

  nameFormControl = new FormControl('', [Validators.required]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]
  );

  passFormControl = new FormControl('', [Validators.required]);

  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log('register');
  }

}
