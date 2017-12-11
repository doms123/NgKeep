import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NoteService implements OnInit {
  userObj: object;
  userid: string;

  constructor(
    private http: Http
  ) {}

  ngOnInit() {

  }

  postNotes(post) {
    return this.http.post('http://localhost:3000/api/postNotes', post)
      .map(res => res.json());
  }

  postNotesWithoutFile(note) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/postNotesWithoutFile', note)
      .map(res => res.json());
  }

  showNotes(userid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    const body = {
      user_id: userid,
      pin: "false"
    };
    return this.http.post('http://localhost:3000/api/notes', body, {headers:headers})
      .map(res => res.json());
  }

  showNotesPinned(userid) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    const body = {
      user_id: userid,
      pin: "true"
    };
    return this.http.post('http://localhost:3000/api/notes-pinned', body, {headers:headers})
      .map(res => res.json());
  }

  pinnedNotes(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      post_id: post_id
    };

    return this.http.post('http://localhost:3000/api/pinned-notes', body, {headers: headers})
      .map(res => res.json());
  }

  unpinnedNotes(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      post_id: post_id
    };

    return this.http.post('http://localhost:3000/api/unpinned-notes', body, {headers: headers})
      .map(res => res.json());
  }

  deleteNote(post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = {
      _id: post_id
    };
    
    return this.http.post('http://localhost:3000/api/delete-notes', body, {headers: headers})
      .map(res => res.json());
  }

  postEditedNote(post) {
    let post_id = post.get('post_id');
    return this.http.post('http://localhost:3000/api/post-edit-notes/' + post_id, post)
      .map(res => res.json());
  }

  postEditedNoteWithoutFile(note, post_id) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/post-edit-notes-nofile/' + post_id, note)
      .map(res => res.json());
  }
}
