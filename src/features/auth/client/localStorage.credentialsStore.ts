import type { AuthUser, StoredCredential } from '../types';

const USERS_KEY = 'eco-barrio-users';
const SESSION_KEY = 'eco-barrio-session';

function safeParse(json: string | null): StoredCredential[] {
  if (!json) return [];
  try {
    const data = JSON.parse(json) as unknown;
    return Array.isArray(data) ? (data as StoredCredential[]) : [];
  } catch {
    return [];
  }
}

export function readCredentials(): StoredCredential[] {
  return safeParse(localStorage.getItem(USERS_KEY));
}

export function writeCredentials(users: StoredCredential[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function writeSessionToken(userId: string): void {
  localStorage.setItem(SESSION_KEY, userId);
}

export function readSessionUserId(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

export function clearSessionMarker(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function resolveUserFromSession(users: StoredCredential[]): AuthUser | null {
  const id = readSessionUserId();
  if (!id) return null;
  const row = users.find((u) => u.id === id);
  if (!row) {
    clearSessionMarker();
    return null;
  }
  return { id: row.id, name: row.name, email: row.email };
}
