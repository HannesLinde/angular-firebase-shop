import { Injectable } from '@angular/core';
import { Firestore, collection, doc, updateDoc, setDoc, docData, getDoc } from '@angular/fire/firestore';
import { User } from '@app/core/services/user';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserSerivce {
  constructor(private fireStorage: Firestore) {}
  // this will create the document for the user
  update(user: User) {
    const { refreshToken, accessToken, ...data } = user;
    return setDoc(doc(this.fireStorage, `users/${user.uid}`), data);
  }

  async get(id: String): Promise<User> {
    const ref = doc(this.fireStorage, `users/${id}`);
    const docData = await getDoc(ref);
    return docData.data() as User;
  }
}
