import {Injectable, NgZone} from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import firebase from "firebase/compat";
import User = firebase.User;
import {getAuth, createUserWithEmailAndPassword} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
 export class AuthenticationService {
  userData: User|null = null;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        console.log("User Data", this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        this.userData = null
        console.log("No user");
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    const app =this.afs.firestore.app;
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res: any) => {
        console.log('You successfully signed up!', res);
      })
      .catch((error: any) => {
        console.log(auth);
        console.log('Something went wrong. Error message:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string): any {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        console.log('You\'re in!', res);
        this.router.navigate(['']);
        this.SetUserData(res.user)
      })
      .catch((err: any) => {
        window.alert('Something went wrong:' + err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.afAuth
      .signOut()
      .then((res: any) => {
        console.log('You\'re out!');
        this.router.navigate(['']);
      })
      .catch((err: any) => {
        console.log('Something went wrong:', err.message);
      })
      .finally(() => console.log("Finally"));
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
}
