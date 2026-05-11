export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

/** Registro sólo frontend */
export type StoredCredential = AuthUser & {
  password: string;
};
