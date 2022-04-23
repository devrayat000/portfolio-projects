import { useEffect } from "react";
import { onAuthStateChanged, type Auth, type User } from "firebase/auth";
import { useAuth } from "./store";

export interface AuthProviderProps {
  children: React.ReactChild;
  auth: Auth;
  onUserLogIn(user: User): void;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
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
