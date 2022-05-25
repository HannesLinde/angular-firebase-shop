import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  User as AuthUser,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from '@angular/fire/auth';
import { User } from './user';
import { deleteItem, saveItem } from '../helpers/Storage';
import { UserSerivce } from '@app/login/user.service';
import { UserState } from '@app/login/store/reducers/login.reducer';
import { Store } from '@ngrx/store';
import { LoginPageActions } from '@app/login/store/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly afAuth: Auth, private userService: UserSerivce, private userStore: Store<UserState>) {
    this.afAuth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const user = this.toUser(authUser, await authUser.getIdToken());
        // retrieve additional information
        const userInfo = Object.assign(user, await this.userService.get(user.uid));
        this.userStore.dispatch(LoginPageActions.updateState({ user: userInfo }));
        saveItem('user', userInfo);
      } else {
        this.userStore.dispatch(LoginPageActions.updateState({ user: null }));
        deleteItem('user');
      }
    });
  }

  async SignUp(email: string, password: string, displayName: string | null): Promise<User | undefined> {
    const authUser = await createUserWithEmailAndPassword(this.afAuth, email, password);
    return await new Promise(async (resolve, reject) => {
      if (authUser) {
        const user = this.toUser(authUser.user, await authUser.user.getIdToken());
        user.displayName = displayName;
        await this.userService.update(user);
        await this.SetUserData(user);
        return resolve(user);
      }
      return reject(undefined);
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

  async SetUserData(user: User) {
    if (this.afAuth.currentUser)
      await updateProfile(this.afAuth.currentUser, {
        displayName: user.displayName,
      });
  }

  singWithGoogle() {
    const provider = new GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: GoogleAuthProvider) {
    return signInWithPopup(this.afAuth, provider).then((credential) => {
      console.log(credential.user);
      //this.updateUserData(credential.user)
    });
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
      admin: false,
    };
  }
}
