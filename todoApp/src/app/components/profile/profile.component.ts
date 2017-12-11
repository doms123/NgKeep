import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  baseUrl: string = "http://localhost:3000/";

  @ViewChild('coverUpload') el: ElementRef;
  @ViewChild('profilePicUpload') el1: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    public profileService: ProfileService,
    private snackbar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.userLogData();
  }

  userLogData() {
    this.profileService.userLogData().subscribe(userdata => {
      this.user = userdata.data[0];
    });
  }

  editProfile() {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      width: '400px',
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.userLogData();
    });
  }

  profileChange(event) {
    let formData = new FormData;
    let file = this.el1.nativeElement.files[0];
    
    formData.append('profileImageName', file.name);
    formData.append('profileImage', file, file.name);
    formData.append('user_id', this.user._id);

    this.profileService.profilePicChange(formData).subscribe(res => {
      this.userLogData();
    });
  }

  coverPhoto(event) {
    let formData = new FormData;
    let file = this.el.nativeElement.files[0];

    formData.append('coverPhotoName', file.name);
    formData.append('profileImage', file, file.name);
    formData.append('user_id', this.user._id);

    this.profileService.coverPhotoChange(formData).subscribe(res => {
      this.userLogData();
    });
  }
  
}
