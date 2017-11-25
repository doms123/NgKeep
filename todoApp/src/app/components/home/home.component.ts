import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormComponent } from '../form/form.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NoteService } from '../../services/note.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animal: string;
  name: string;
  notes: any;

  constructor(
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    public noteService: NoteService
  ) { }

  ngOnInit() {
    console.log(localStorage.getItem('id_token'));
    this.showNotes();
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '431px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogDelete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  pinned() {
    this.snackBar.open('Pinned', 'close', {
      duration: 3000
    });
  }

  showNotes() {
    console.log('shownots')
    this.noteService.showNotes().subscribe(res => {
      this.notes = res;
    });
  }

  post(event) {
    console.log(event);
    this.showNotes();
  }
}
