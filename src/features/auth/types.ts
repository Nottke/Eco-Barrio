export type UserRole = 'USER' | 'ADMIN';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

/** Registro sólo frontend */
export type StoredCredential = AuthUser & {
  password: string;
};