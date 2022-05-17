import { HttpErrorResponse } from '@angular/common/http';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  docData,
  deleteDoc,
  addDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { catchError, map, tap, Observable, throwError } from 'rxjs';
import { Adapter } from './adapter';
export abstract class FireBaseFacade<T, R> {
  constructor(private collection: string) {}

  // to resolve circular injection
  abstract getFirestore(): Firestore;
  abstract getAdapter(): Adapter<T, R>;

  getAll(): Observable<T[]> {
    const ref = collection(this.getFirestore(), this.collection);
    return collectionData(ref, { idField: 'id' }).pipe(
      map((object) => (object as R[]).map((item) => this.getAdapter().toModel(item))),
      catchError(this.handleError)
    );
  }

  get(id: String): Observable<T> {
    const ref = doc(this.getFirestore(), `${this.collection}/${id}`);
    return docData(ref, { idField: 'id' }).pipe(
      map((object) => this.getAdapter().toModel(object as R)),
      catchError(this.handleError)
    );
  }

  async add(data: T) {
    const ref = collection(this.getFirestore(), this.collection);
    const docRef = await addDoc(ref, this.getAdapter().toDto(data));
    return docData(docRef, { idField: 'id' }).pipe(
      map((object) => this.getAdapter().toModel(object as R)),
      catchError(this.handleError)
    );
  }

  async delete(id: string) {
    return deleteDoc(doc(this.getFirestore(), `${this.collection}/${id}`));
  }

  async update(id: string, data: T) {
    return updateDoc(doc(this.getFirestore(), `${this.collection}/${id}`), this.getAdapter().toDto(data));
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
