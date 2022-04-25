import { auth } from "$lib/modules/firebase";
import { AuthProvider as FirebaseAuthProvider } from "$lib/store/auth";
import { useLocation, useNavigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: React.ReactChild }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <FirebaseAuthProvider
      auth={auth}
      // onUserLogIn={() => {
      //   navigate((location.state as any)?.from?.pathname ?? "/", {
      //     replace: true,
      //   });
      // }}
    >
      {children}
    </FirebaseAuthProvider>
  );
};

export default AuthProvider;
