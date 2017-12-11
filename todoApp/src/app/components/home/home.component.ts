import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { FormComponent } from '../form/form.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NoteService } from '../../services/note.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';

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
  userId:string;

  constructor(
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    public activatedRoute: ActivatedRoute,
    public noteService: NoteService,
  ) {

  }

  ngOnInit() {
    if (localStorage.getItem('user') == null) {
      this.activatedRoute.params.subscribe(params => {
        let user = {
          userid: params['id']
        };
        localStorage.setItem('user', JSON.stringify(user));

        this.userId = JSON.parse(localStorage.getItem('user'))['userid'];
      });
      console.log('visited');
    }else {
      this.userId = JSON.parse(localStorage.getItem('user'))['userid'];
    }

    setTimeout(() => {
      this.showNotes(this.userId);
      this.showNotesPinned(this.userId);
      console.log('this.userId', this.userId);
    }, 400);
  }

  pinned(post_id:string) {
    this.noteService.pinnedNotes(post_id).subscribe(res => {
      this.snackBar.open(res.msg, 'close', {
        duration: 3000
      });

      this.showNotes(this.userId);
      this.showNotesPinned(this.userId);
    });
  }

  unpinned(post_id:string) {
    this.noteService.unpinnedNotes(post_id).subscribe(res => {
      this.snackBar.open(res.msg, 'close', {
        duration: 3000
      });

      this.showNotes(this.userId);
      this.showNotesPinned(this.userId);
    });
  }

  showNotes(userId) {
    this.noteService.showNotes(userId).subscribe(res => {
      this.notes = res;
    });
  }

  showNotesPinned(userId) {
    this.noteService.showNotesPinned(userId).subscribe(res => {
      this.pinnedNotes = res;
    });
  }

  post(event) {
    this.showNotes(this.userId);
    this.showNotesPinned(this.userId);
  }

  deleteNote(post_id:string){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {post_id: post_id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showNotes(this.userId);
      this.showNotesPinned(this.userId);
    });
  }

  editNote(note:object) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '431px',
      height: 'auto',
      data: { note: note }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.snackBar.open('Notes was edited', 'close', {
        duration: 3000
      });

      this.showNotes(this.userId);
      this.showNotesPinned(this.userId);
    });
  }
}
