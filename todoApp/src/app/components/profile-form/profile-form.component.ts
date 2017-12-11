import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms/src/model';
import { ProfileService } from '../../services/profile.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})

export class ProfileFormComponent implements OnInit {
  userid: string;
  about: string;
  phone: string;
  address: string;
  email: string;
  name: string;
  website: string;

  editProfileForm: FormGroup;
  aboutCtrl: FormControl;
  phoneCtrl: FormControl;
  addressCtrl: FormControl;
  emailCtrl: FormControl;
  nameCtrl: FormControl;
  websiteCtrl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: MatSnackBar,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.aboutCtrl = new FormControl('');
    this.phoneCtrl = new FormControl('');
    this.addressCtrl = new FormControl('');
    this.emailCtrl = new FormControl('', Validators.pattern(EMAIL_REGEX));
    this.nameCtrl = new FormControl('');
    this.websiteCtrl = new FormControl('');

    this.editProfileForm = new FormGroup({
      about: this.aboutCtrl,
      phone: this.phoneCtrl,
      address: this.addressCtrl,
      email: this.emailCtrl,
      name: this.nameCtrl,
      website: this.websiteCtrl
    });

    this.userid = JSON.parse(localStorage.getItem('user'))['userid'];

    this.about = this.data.about;
    this.phone = this.data.phone;
    this.address = this.data.address;
    this.email = this.data.email;
    this.name = this.data.name;
    this.website = this.data.website;
  }

  editProfileOnSubmit(formData) {
    if (this.editProfileForm.valid) {
      let profileData = {
        _id: this.userid,
        about: this.about,
        phone: this.phone,
        address: this.address,
        email: this.email,
        name: this.name,
        website: this.website
      };

      this.profileService.saveProfileData(profileData).subscribe(res => {
        this.dialogRef.close();
        this.snackbar.open('Profile Information was updated', 'close', {
          duration: 4000
        });
      });

    }else { // Invalid email format
      this.snackbar.open('Invalid email address format', 'close', {
        duration: 4000
      });
    }
  }
}
