import { Injectable } from '@angular/core';
import {
  getMetadata,
  ref,
  uploadBytes,
  deleteObject,
  Storage,
  StorageReference,
  getDownloadURL,
} from '@angular/fire/storage';

import {} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseStorage {
  constructor(private storage: Storage) {}

  getFileUrl(fileName: string, dataPath?: string) {
    const fileStoragePath = dataPath ? `images/products/${dataPath}/${fileName}` : `images/products/${fileName}`;
    const fileRef = ref(this.storage, fileStoragePath);
    const url = `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(
      fileStoragePath
    )}?alt=media`;
    return url;
  }

  async uploadFile(file: File, dataPath?: string) {
    const fileRef = ref(
      this.storage,
      dataPath ? `images/products/${dataPath}/${file.name}` : `images/products/${file.name}`
    );
    return uploadBytes(fileRef, file);
  }

  async removeFile(fileName: string, dataPath?: string) {
    const fileStoragePath = dataPath ? `images/products/${dataPath}/${fileName}` : `images/products/${fileName}`;
    const fileRef = ref(this.storage, fileStoragePath);
    return deleteObject(fileRef);
  }
}
