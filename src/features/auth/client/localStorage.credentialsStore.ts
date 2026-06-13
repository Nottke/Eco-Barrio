import type {
  AuthUser,
  StoredCredential,
} from '../types';

const USERS_KEY = 'eco-barrio-users';
const SESSION_KEY = 'eco-barrio-session';

function safeParse(json: string | null): StoredCredential[] {
  if (!json) {
    return [];
  }

  try {
    const data = JSON.parse(json) as unknown;

    if (!Array.isArray(data)) {
      return [];
    }

    return data
      .map((row): StoredCredential | null => {
        if (!row || typeof row !== 'object') {
          return null;
        }

        const candidate = row as Partial<StoredCredential> & {
          id?: number | string;
        };

        const id =
          typeof candidate.id === 'number'
            ? candidate.id
            : Number(candidate.id);

        if (
          !Number.isFinite(id) ||
          typeof candidate.name !== 'string' ||
          typeof candidate.email !== 'string' ||
          typeof candidate.password !== 'string'
        ) {
          return null;
        }

        return {
          id,
          name: candidate.name,
          email: candidate.email,
          password: candidate.password,
          role:
            candidate.role === 'ADMIN'
              ? 'ADMIN'
              : 'USER',
        };
      })
      .filter(
        (row): row is StoredCredential =>
          row !== null,
      );
  } catch {
    return [];
  }
}

export function readCredentials(): StoredCredential[] {
  return safeParse(
    localStorage.getItem(USERS_KEY),
  );
}

export function writeCredentials(
  users: StoredCredential[],
): void {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users),
  );
}

export function writeSessionToken(
  userId: number,
): void {
  localStorage.setItem(
    SESSION_KEY,
    String(userId),
  );
}

export function readSessionUserId(): number | null {
  const storedId =
    localStorage.getItem(SESSION_KEY);

  if (!storedId) {
    return null;
  }

  const id = Number(storedId);

  if (!Number.isFinite(id)) {
    clearSessionMarker();
    return null;
  }

  return id;
}

export function clearSessionMarker(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function resolveUserFromSession(
  users: StoredCredential[],
): AuthUser | null {
  const id = readSessionUserId();

  if (id === null) {
    return null;
  }

  const row = users.find(
    (user) => user.id === id,
  );

  if (!row) {
    clearSessionMarker();
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
  };
}