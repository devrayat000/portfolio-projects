import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Error404 from "$lib/pages/404";
import RequireAuth from "$lib/components/route/with-auth";
import AuthProvider from "$lib/components/provider/auth";
import LazyRoute from "$lib/components/route/lazy";
import { lazy } from "react";
import WithoutAuth from "$lib/components/route/without-auth";

const HomePage = lazy(() => import("$lib/pages"));
const LoginPage = lazy(() => import("$lib/pages/auth/login"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Authenticated Routes */}
          <Route path="/" element={<RequireAuth />}>
            <Route element={<LazyRoute />}>
              <Route index element={<HomePage />} />
            </Route>
          </Route>
          {/* Authentication Routes */}
          <Route path="auth" element={<WithoutAuth />}>
            <Route element={<LazyRoute />}>
              <Route path="login" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<Navigate to="login" />} />
          </Route>
          {/* Not found */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
