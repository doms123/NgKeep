import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ischecked = true;

  sideNavStatus:boolean = true;

  onChange($event) {
    console.log($event);
  }

  sideToggle() {
    this.sideNavStatus = !this.sideNavStatus;
    console.log(this.sideNavStatus);
  }
}
