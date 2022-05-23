import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { Auth, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: User | undefined = undefined;

  constructor(private readonly afAuth: Auth, private router: Router) {
    this.afAuth.onAuthStateChanged((user) => {
      // update authentification state
      console.log('state changed');
      if (user) {
        this.userData = user;
        console.log('User Data', this.userData);
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        this.userData = undefined;
        console.log('No user');
        localStorage.removeItem('user');
        //JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  /* Sign up */
  /*async SignUp(email: string, password: string) {
    createUserWithEmailAndPassword(this.afAuth, email, password)
      .then((res: any) => {
        console.log('You successfully signed up!', res);
      })
      .catch((error: any) => {
        console.log(auth);
        console.log('Something went wrong. Error message:', error.message);
      });
  }*/

  async SignUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.afAuth, email, password);
  }

  /* Sign in */
  /*SignIn(email: string, password: string): any {
    signInWithEmailAndPassword(this.afAuth, email, password)
      .then((res: any) => {
        console.log("You're in!", res);
        this.router.navigate(['']);
        this.SetUserData(res.user);
      })
      .catch((err: any) => {
        window.alert('Something went wrong:' + err.message);
      });
  }*/

  SignIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.afAuth, email, password);
  }

  /* Sign out */
  /*SignOut() {
    signOut(this.afAuth)
      .then((res: any) => {
        console.log("You're out!");
        this.router.navigate(['']);
      })
      .catch((err: any) => {
        console.log('Something went wrong:', err.message);
      })
      .finally(() => console.log('Finally'));
  }*/

  async SignOut() {
    return await this.afAuth.signOut();
  }

  SetUserData(user: any) {
    /*const userRef: AngularFirestoreDocument<any> = this.afs.doc(
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
    });*/
    console.log('Set User Data!');
  }

  SendVerificationMail() {
    /*return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });*/
    console.log('Send verification mail');
  }
}
