import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  userid: string;

  constructor(
    private http: Http
  ) {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem('user')) != null) {
        this.userid = JSON.parse(localStorage.getItem('user'))['userid'];
      }
    }, 400);
  }

  saveProfileData(profileData: object) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log('profileData', profileData);
    return this.http.post('http://localhost:3000/api/save-profile', profileData, {headers: headers})
      .map(res => res.json());
  }

  userLogData() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {
      _id: JSON.parse(localStorage.getItem('user'))['userid']
    };
    return this.http.post('http://localhost:3000/api/user-logdata', data, {headers: headers})
      .map(res => res.json());
  }

  profilePicChange(formData) {
    return this.http.post('http://localhost:3000/api/profilepic-change', formData)
      .map(res => res.json());
  }

  coverPhotoChange(formData) {
    return this.http.post('http://localhost:3000/api/coverphoto-change', formData)
      .map(res => res.json());
  }
}
