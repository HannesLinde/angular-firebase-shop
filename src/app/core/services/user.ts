export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  admin: boolean;
  refreshToken?: string | null;
  accessToken?: string | null;
  photoURL?: string | null;
  phoneNumber: string | null;
}
