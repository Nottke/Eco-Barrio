import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  AuthUiResult,
  FrontendCredentialsClient,
} from '../client/frontendAuth.contract';

import type { AuthUser } from '../types';
import { createBrowserFrontendCredentialsClient } from '../client/browserFrontendCredentials.adapter';

type AuthContextValue = {
  user: AuthUser | null;
  busy: boolean;
  login: (email: string, password: string) => Promise<AuthUiResult>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthUiResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const defaultFrontendAuthClient =
  createBrowserFrontendCredentialsClient();

export function AuthProvider({
  children,
  client = defaultFrontendAuthClient,
}: {
  children: ReactNode;
  client?: FrontendCredentialsClient;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let cancelled = false;
    client.bootstrap().then(({ user: bootUser }) => {
      if (!cancelled) {
        setUser(bootUser);
        setBusy(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [client]);

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await client.login(email.trim(), password);
      if (!result.ok) return result;
      setUser(result.user);
      return { ok: true } as const;
    },
    [client]
  );

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const result = await client.register(name, email, password);
      if (!result.ok) return result;
      setUser(result.user);
      return { ok: true } as const;
    },
    [client]
  );

  const logout = useCallback(() => {
    void client.logout().then(() => setUser(null));
  }, [client]);

  const value = useMemo(
    () => ({ user, busy, login, register, logout }),
    [busy, login, logout, register, user]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
