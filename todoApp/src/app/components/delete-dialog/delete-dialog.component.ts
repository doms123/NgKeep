import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { NoteService } from '../../services/note.service';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public noteService: NoteService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log(';te')
  }

  confirmDeleteClick() {
    this.noteService.deleteNote(this.data).subscribe(res => {
      this.snackBar.open(res.msg, 'close', {
        duration: 3000
      });

      this.dialogRef.close();
    });
  }

}
