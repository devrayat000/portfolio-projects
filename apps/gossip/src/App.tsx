import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "$lib/pages";
import Error404 from "$lib/pages/404";
import LoginPage from "$lib/pages/auth/login";
import RequireAuth from "$lib/components/route/with-auth";
import AuthProvider from "$lib/components/provider/auth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
          </Route>
          {/* Not found */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
