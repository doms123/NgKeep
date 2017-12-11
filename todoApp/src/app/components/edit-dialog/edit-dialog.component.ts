import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from '../../services/note.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  postTitle: string;
  postText: string;
  postFile: any;
  postPin: any;
  userObj: object;
  userid: string;
  post_id: string;

  postForm: FormGroup;
  postTitleCtrl: FormControl;
  postTextCtrl: FormControl;
  postPinCtrl: FormControl;
  time: any;
  dateVal: any;
  datetime: any;
  activeTime: any;

  @ViewChild('fileInput') el: ElementRef;


  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public noteService: NoteService,
    public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.postTitleCtrl = new FormControl('', Validators.required);
    this.postTextCtrl = new FormControl('', Validators.required);
    this.postPinCtrl = new FormControl('');

    this.postForm = new FormGroup({
      postTitle: this.postTitleCtrl,
      postText: this.postTextCtrl,
      postPin: this.postPinCtrl,
    });

    this.userObj = JSON.parse(localStorage.getItem('user'));
    this.userid = this.userObj['userid'];

    let maxTime = 24;

    let arrObj = [];
    for (let x = 1; x <= maxTime; x++) {
      let hour = (x <= 9) ? "0" + x : x;
      let hour1 = hour + ":00";
      let obj1 = {};
      obj1['timeStr'] = hour1;
      arrObj.push(obj1);

      if (x < maxTime) {
        let obj2 = {};
        obj2['timeStr'] = hour + ":30";
        arrObj.push(obj2);
      }
    }

    this.time = arrObj;
    this.postTitle = this.data.note['title'];
    this.postText = this.data.note['note'];
    this.postFile = this.data.note['file'];
    this.post_id = this.data.note['_id'];
    this.postPin = (this.data.note['pin'] == "true") ? true : false;

    if (this.data.note['post_date']) {
      let dateArr = this.data.note['post_date'].split('-');
      let dayAndTimeArr = dateArr[2].split(' ');
      this.dateVal = dayAndTimeArr[0] + '/' + dateArr[1] + '/' + dateArr[0];
      this.datetime = dayAndTimeArr[1];
      let timeArr = dayAndTimeArr[1].split(":");
      this.activeTime = timeArr[0] + ':' + timeArr[1];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  dateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    let month = event.value.getMonth() + 1;
    let year = event.value.getFullYear();
    let day = event.value.getUTCDate() + 1;
    this.dateVal = `${month}/${day}/${year}`;
  }

  timeEvent(event) {
    this.datetime = event.value;
  }

  postEditedNote() {
    let postDateTime = '';
    if (this.dateVal != null) {
      let postDateTimeArr = this.dateVal.split('/');
      let postDate = postDateTimeArr[2] + '-' + postDateTimeArr[1] + '-' + postDateTimeArr[0];

      postDateTime = postDate + ' ' + this.datetime + ':00';
    }
    let formData = new FormData();
    if (this.el.nativeElement.files[0] != null) { // if has file to upload
      let file = this.el.nativeElement.files[0];

      this.postPin = (this.postPin) ? 'true' : 'false';
      formData.append('postTitle', this.postTitle);
      formData.append('postText', this.postText);
      formData.append('postPin', this.postPin);
      formData.append('postFileName', file.name);
      formData.append('postFile', file, file.name);
      formData.append('user_id', this.userid);
      formData.append('post_date', postDateTime);
      formData.append('post_id', this.post_id);

      this.noteService.postEditedNote(formData).subscribe(res => {
        this.dialogRef.close();
      });

    } else {
      this.postPin = (this.postPin) ? 'true' : 'false';
      let note = {
        post_id: this.post_id,
        title: this.postTitle,
        note: this.postText,
        pin: this.postPin,
        user_id: this.userid,
        post_date: postDateTime,
        file: this.postFile
      };
      this.noteService.postEditedNoteWithoutFile(note, this.post_id).subscribe(res => {
        this.dialogRef.close();
      });
    }
  }
}
