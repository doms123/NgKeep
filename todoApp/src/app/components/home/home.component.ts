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
  name: string;
  notes: any;
  pinnedNotes: any;
  baseUrl:string = "http://localhost:3000/";

  constructor(
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    public noteService: NoteService
  ) { }

  ngOnInit() {
    this.showNotes();
    this.showNotesPinned();
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '431px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.animal = result;
    });
  }



  pinned(post_id:string) {
    this.noteService.pinnedNotes(post_id).subscribe(res => {
      this.snackBar.open(res.msg, 'close', {
        duration: 3000
      });

      this.showNotes();
      this.showNotesPinned();
    });
  }

  unpinned(post_id:string) {
    this.noteService.unpinnedNotes(post_id).subscribe(res => {
      this.snackBar.open(res.msg, 'close', {
        duration: 3000
      });

      this.showNotes();
      this.showNotesPinned();
    });
  }

  showNotes() {
    this.noteService.showNotes().subscribe(res => {
      this.notes = res;
    });
  }

  showNotesPinned() {
    this.noteService.showNotesPinned().subscribe(res => {
      this.pinnedNotes = res;
    });
  }

  post(event) {
    this.showNotes();
    this.showNotesPinned();
  }

  deleteNote(post_id:string) : void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
    });

    dialogRef.afterOpen().subscribe(result => {
      console.log('result', result)
    });
    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   width: '300px',
    // });
    // this.noteService.deleteNote(post_id).subscribe(res => {
    //   dialogRef.afterClosed().subscribe(result => {
    //     // this.animal = result;
    //   });

    //   this.snackBar.open(res.msg, 'close', {
    //     duration: 3000
    //   });

    //   this.showNotes();
    //   this.showNotesPinned();
    // });
  }

  // openDialogDelete(): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '300px',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.animal = result;
  //   });
  // }
}
