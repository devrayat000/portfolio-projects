export * from "./store";
export * from "./provider";

import createStore from "zustand";
import { devtools } from "zustand/middleware";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { AuthStore } from "./store";
import type { AuthProviderProps } from "./provider";

export function createAuthStore(key: string) {
  const useAuth = createStore<AuthStore>()(
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
      { name: key }
    )
  );

  const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
    auth,
    onUserLogIn,
  }) => {
    const setUser = useAuth((state) => state.setUser);
    const setError = useAuth((state) => state.setError);
    const setLoading = useAuth((state) => state.setLoading);

    useEffect(() => {
      return onAuthStateChanged(
        auth,
        (user) => {
          setUser(user);
          setLoading(false);
          if (user) onUserLogIn(user);
        },
        (error) => {
          console.log(error);
          setError(error);
          setLoading(false);
        }
      );
    }, []);

    return <>{children}</>;
  };

  return { useAuth, AuthProvider };
}
