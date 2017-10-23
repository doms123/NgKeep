import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormComponent } from '../form/form.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  openDialogEdit(): void {
    let dialogRef = this.dialog.open(FormComponent, {
      width: '431px',
      height: '230px',
      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogDelete(): void {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      // height: '250px',
      //data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  
}
