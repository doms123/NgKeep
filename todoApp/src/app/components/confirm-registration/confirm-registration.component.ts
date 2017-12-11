import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.activatedRoute.params.subscribe(params => {
    //   let user = {
    //     userid: params['id']
    //   };
    //   console.log('user', user);
    // });
  }

}
