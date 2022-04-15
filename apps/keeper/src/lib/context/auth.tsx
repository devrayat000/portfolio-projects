import { AuthData } from "$lib/services/auth";
import React, { useContext, createContext, useState, useCallback } from "react";
import { setCookie } from "nookies";

interface AuthContext extends Partial<AuthData> {
  setAuth: (props: AuthData) => void;
}

const AuthContext = createContext<AuthContext>({
  user: undefined,
  jwt: undefined,
  setAuth: (props) => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [jwt, setJwt] = useState<string>();
  const [user, setUser] = useState<AuthData["user"]>();

  const setAuth = useCallback((props: AuthData) => {
    setJwt(props.jwt);
    setUser(props.user);
    setCookie(null, "keeper.sid.access", props.jwt);
  }, []);

  return (
    <AuthContext.Provider value={{ jwt, user, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
