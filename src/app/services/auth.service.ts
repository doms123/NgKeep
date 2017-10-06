import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  public isLoggedIn() {
   let promise = new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        resolve(1);
      }else {
        reject(0);
      }
    });
   });

   return promise;
  }

  public loginWithEmailAndPass(email:string, pass:string) {
    let promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, pass).then(userData => {
        resolve(userData);
      }).catch(error => {
        reject(error);
      });
      
    });

    return promise;
  }

  public loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    
    let promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider).then(googleAuth => {
        resolve(googleAuth);
      }).catch(error => {
        reject(error);
      });
    });

    return promise;
  }

  public loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    let promise = new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        resolve(result.user);
      }).catch(function(error) {
        reject(error.message);
      });
    });

    return promise;
  }
}
