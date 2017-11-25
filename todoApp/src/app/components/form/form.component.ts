import { Component, OnInit, ElementRef, Renderer2, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { MatSnackBar } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  postTitle: string;
  postText: string;
  postFile: any;
  postPin: any;
  userObj: object;
  userid: string;

  postForm: FormGroup;
  postTitleCtrl: FormControl;
  postTextCtrl: FormControl;
  postPinCtrl: FormControl;
  time: any;
  dateVal: any;
  datetime: any;

  @ViewChild('fileInput') el: ElementRef;
  @Output() onPost = new EventEmitter;

  constructor(
    private noteService: NoteService,
    private snackbar: MatSnackBar,
  ) { }

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
    for(let x = 1; x <= maxTime; x++) {
      let hour = (x <= 9) ? "0" + x : x;
        let hour1 = hour + ":00";
        let obj1 = {};
        obj1['timeStr'] = hour1;
        arrObj.push(obj1);

        if(x < maxTime) {
          let obj2 = {};
          obj2['timeStr'] = hour + ":30";
          arrObj.push(obj2);
        }
    }

    this.time = arrObj;
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

  postNotes(event) {
    let postDateTime = '';
    if (this.dateVal != null) {
      let postDateTimeArr = this.dateVal.split('/');
      let postDate = postDateTimeArr[2] + '-' + postDateTimeArr[1] + '-' + postDateTimeArr[0];

      postDateTime = postDate+' '+this.datetime+':00';
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
      
      this.noteService.postNotes(formData).subscribe(res => {
        this.snackbar.open(res.msg, 'close', {
          duration: 5000
        });
        this.onPost.emit(event.value);
        this.postForm.reset();
      });
      
    } else {
      let note = {
        title: this.postTitle,
        note: this.postText,
        pin: this.postPin,
        file: '',
        user_id: this.userid,
        post_date: postDateTime
      };
      this.noteService.postNotesWithoutFile(note).subscribe(res => {
        this.snackbar.open(res.msg, 'close', {
          duration: 5000
        });

        this.onPost.emit(event);
        this.postForm.reset();
      });
    }
  }
}
