import type { FrontendCredentialsClient } from './frontendAuth.contract';
import type { AuthUser } from '../types';
import {
  clearSessionMarker,
  readCredentials,
  resolveUserFromSession,
  writeCredentials,
  writeSessionToken,
} from './localStorage.credentialsStore';
import { isStrongEnoughPassword, isValidEmail } from '../utils/validation';

function publicUser(user: AuthUser): AuthUser {
  return { id: user.id, name: user.name, email: user.email };
}

function newGuestId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `user-${Date.now()}`;
}

/** Implementación navegador sin servidor. */
export function createBrowserFrontendCredentialsClient(): FrontendCredentialsClient {
  return {
    async bootstrap() {
      const users = readCredentials();
      const u = resolveUserFromSession(users);
      return Promise.resolve({ user: u ? publicUser(u) : null });
    },

    async login(email: string, password: string) {
      const trimmedEmail = email.trim().toLowerCase();
      const users = readCredentials();
      const match = users.find((u) => u.email.toLowerCase() === trimmedEmail);

      if (!match || match.password !== password) {
        return Promise.resolve({
          ok: false,
          message: 'Correo o contraseña incorrectos.',
        });
      }

      writeSessionToken(match.id);
      return Promise.resolve({ ok: true, user: publicUser(match) });
    },

    async register(name: string, email: string, password: string) {
      const trimmedName = name.trim();
      const trimmedEmail = email.trim().toLowerCase();

      if (trimmedName.length < 2) {
        return Promise.resolve({
          ok: false,
          message: 'Introduce tu nombre completo.',
        });
      }
      if (!isValidEmail(trimmedEmail)) {
        return Promise.resolve({
          ok: false,
          message: 'Correo electrónico no válido.',
        });
      }
      if (!isStrongEnoughPassword(password)) {
        return Promise.resolve({
          ok: false,
          message: 'La contraseña debe tener al menos 6 caracteres.',
        });
      }

      const users = readCredentials();
      const exists = users.some((u) => u.email.toLowerCase() === trimmedEmail);
      if (exists) {
        return Promise.resolve({
          ok: false,
          message: 'Ya existe una cuenta con este correo.',
        });
      }

      const id = newGuestId();
      const nextRow = {
        id,
        name: trimmedName,
        email: trimmedEmail,
        password,
      };
      writeCredentials([...users, nextRow]);
      writeSessionToken(id);
      return Promise.resolve({
        ok: true,
        user: publicUser(nextRow),
      });
    },

    async logout() {
      clearSessionMarker();
      return Promise.resolve();
    },
  };
}
