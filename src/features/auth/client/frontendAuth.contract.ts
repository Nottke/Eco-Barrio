import type { AuthUser } from '../types';

export type AuthUiResult =
  | { ok: true }
  | { ok: false; message: string };

export type CredentialsBootstrap = { user: AuthUser | null };

export type CredentialsLoginOutcome =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export type CredentialsRegisterOutcome =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

/** Autenticación solo en cliente sin servidor */
export type FrontendCredentialsClient = {
  bootstrap(): Promise<CredentialsBootstrap>;
  login(email: string, password: string): Promise<CredentialsLoginOutcome>;
  register(name: string, email: string, password: string): Promise<CredentialsRegisterOutcome>;
  logout(): Promise<void>;
};
