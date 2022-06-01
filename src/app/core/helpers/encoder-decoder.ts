export const encodeUrl = (bucket: string, fileStoragePath: string) =>
  `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(fileStoragePath)}?alt=media`;
