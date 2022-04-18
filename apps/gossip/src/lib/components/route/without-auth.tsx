import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "$lib/store";
import { LoadingOverlay } from "@mantine/core";

export default function WithoutAuth() {
  const user = useAuth((state) => state.user);
  const loading = useAuth((state) => state.loading);

  //   const location = useLocation();

  if (loading) {
    return <LoadingOverlay visible={loading} />;
  }

  if (!!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
