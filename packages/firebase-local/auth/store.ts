import { type User } from "firebase/auth";
import createStore from "zustand";
import { devtools } from "zustand/middleware";

export interface AuthStore {
  user: User | null;
  error: Error | null;
  loading: boolean;
  setUser(user: User | null): void;
  setError(error: Error | null): void;
  setLoading(state: boolean): void;
}

export const useAuth = createStore<AuthStore>()(
  devtools<AuthStore>(
    (set) => ({
      user: null,
      error: null,
      loading: true,
      setUser(user) {
        set({ user });
      },
      setError(error) {
        set({ error });
      },
      setLoading(loading) {
        set({ loading });
      },
    }),
    { name: "gossip.dev" }
  )
);
