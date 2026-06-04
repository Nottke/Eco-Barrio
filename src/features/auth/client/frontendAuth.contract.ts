import type { AuthUser } from '../types';

export type AuthUiResult =
  | { ok: true; user: AuthUser }
  | { ok: false; message: string };

export type CredentialsBootstrap = { user: AuthUser | null };

export type CredentialsLoginOutcome = AuthUiResult;

export type CredentialsRegisterOutcome = AuthUiResult;

export type FrontendCredentialsClient = {
  bootstrap(): Promise<CredentialsBootstrap>;
  login(email: string, password: string): Promise<CredentialsLoginOutcome>;
  register(
    name: string,
    email: string,
    password: string
  ): Promise<CredentialsRegisterOutcome>;
  logout(): Promise<void>;
};