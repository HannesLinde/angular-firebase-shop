import { Injectable } from '@angular/core';
import { Firestore, collection, doc, updateDoc, setDoc } from '@angular/fire/firestore';
import { User } from '@app/core/services/user';

@Injectable()
export class UserSerivce {
  constructor(private fireStorage: Firestore) {}
  // this will create the document for the user
  update(user: User) {
    const { refreshToken, accessToken, ...data } = user;
    return setDoc(doc(this.fireStorage, `users/${user.uid}`), data);
  }
}
