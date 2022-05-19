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

export abstract class FirebaseStorage {
  constructor(private relativeStoragePath: string) {}

  // to resolve circular injection
  abstract getStorage(): Storage;

  getFileUrl(fileName: string, dataPath?: string) {
    const fileStoragePath = dataPath
      ? `${this.relativeStoragePath}${dataPath}/${fileName}`
      : `${this.relativeStoragePath}${fileName}`;
    const fileRef = ref(this.getStorage(), fileStoragePath);
    // to avoid using getDownloadURL and sending many requests to get url -> we build it
    const url = `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${encodeURIComponent(
      fileStoragePath
    )}?alt=media`;
    return url;
  }

  async uploadFile(file: File, dataPath?: string) {
    const fileRef = ref(
      this.getStorage(),
      dataPath ? `${this.relativeStoragePath}${dataPath}/${file.name}` : `${this.relativeStoragePath}${file.name}`
    );
    return uploadBytes(fileRef, file);
  }

  async removeFile(fileName: string, dataPath?: string) {
    const fileStoragePath = dataPath
      ? `${this.relativeStoragePath}${dataPath}/${fileName}`
      : `${this.relativeStoragePath}${fileName}`;
    const fileRef = ref(this.getStorage(), fileStoragePath);
    return deleteObject(fileRef);
  }

  async removeFiles(filesName: string[], dataPath?: string) {
    return Promise.all([...filesName.map((fileName) => this.removeFile(fileName, dataPath))]);
  }
}
