export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  refreshToken?: string | null;
  accessToken?: string | null;
  photoURL?: string | null;
  phoneNumber: string | null;
}
