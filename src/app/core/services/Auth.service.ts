import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, User as AuthUser } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly afAuth: Auth) {
    this.afAuth.onAuthStateChanged(async (authUser) => {
      // update authentification state
      if (authUser) {
        const user = this.toUser(authUser, await authUser.getIdToken());
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  async SignUp(email: string, password: string): Promise<User | undefined> {
    const user = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await new Promise(async (resolve, reject) => {
      return resolve(user ? this.toUser(user.user, await user.user.getIdToken()) : undefined);
    });
  }

  async SignIn(email: string, password: string): Promise<User | undefined> {
    const user = await signInWithEmailAndPassword(this.afAuth, email, password);
    return await new Promise(async (resolve, reject) => {
      return resolve(user ? this.toUser(user.user, await user.user.getIdToken()) : undefined);
    });
  }

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

  private toUser(authUser: AuthUser, token: string): User {
    return {
      displayName: authUser.displayName,
      email: authUser.email,
      emailVerified: authUser.emailVerified,
      uid: authUser.uid,
      accessToken: token,
      refreshToken: authUser.refreshToken,
      phoneNumber: authUser.phoneNumber,
      photoURL: authUser.photoURL,
    };
  }
}
