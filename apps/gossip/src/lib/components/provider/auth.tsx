import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "$lib/modules/firebase";
import { useAuth } from "$lib/store";

type Props = { children: React.ReactNode };

const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const setUser = useAuth((state) => state.setUser);
  const setError = useAuth((state) => state.setError);
  const setLoading = useAuth((state) => state.setLoading);

  useEffect(() => {
    return onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
          navigate("/", { replace: true });
        }
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

export default AuthProvider;