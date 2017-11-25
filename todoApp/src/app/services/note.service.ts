import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NoteService {

  constructor(
    private http: Http
  ) { }

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

  showNotes() {
    return this.http.get('http://localhost:3000/api/notes')
      .map(res => res.json());
  }
}
