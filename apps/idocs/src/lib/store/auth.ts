import { createAuthStore } from "firebase-local/auth";

export const { AuthProvider, useAuth } = createAuthStore("idocs.store.auth");
