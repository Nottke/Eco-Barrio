import api from "../../../services/api";

import type {
  AuthUiResult,
  FrontendCredentialsClient,
} from "./frontendAuth.contract";

import type { AuthUser } from "../types";

const STORAGE_USER_KEY = "user";
const STORAGE_TOKEN_KEY = "token";

export function createBackendFrontendCredentialsClient(): FrontendCredentialsClient {
  return {
    async bootstrap() {
      const storedUser = localStorage.getItem(STORAGE_USER_KEY);

      if (!storedUser) {
        return { user: null };
      }

      return {
        user: JSON.parse(storedUser) as AuthUser,
      };
    },

    async login(email: string, password: string): Promise<AuthUiResult> {
      try {
        const response = await api.post("/auth/login", {
          email,
          password,
        });

        const { token, user } = response.data;

        localStorage.setItem(STORAGE_TOKEN_KEY, token);
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));

        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          message: String(error),
        };
      }
    },

    async register(
      name: string,
      email: string,
      password: string
    ): Promise<AuthUiResult> {
      try {
        const response = await api.post("/auth/register", {
          name,
          email,
          password,
        });

        const { user } = response.data;

        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          message: String(error),
        };
      }
    },

    async logout() {
      localStorage.removeItem(STORAGE_TOKEN_KEY);
      localStorage.removeItem(STORAGE_USER_KEY);
    },
  };
}