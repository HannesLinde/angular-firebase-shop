import { Injectable } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FirebaseStorage } from '@app/core/firebase-storage.service';

@Injectable()
export class ProductStorage extends FirebaseStorage {
  constructor(private storage: Storage) {
    super('images/products/');
  }
  getStorage(): Storage {
    return this.storage;
  }
}
