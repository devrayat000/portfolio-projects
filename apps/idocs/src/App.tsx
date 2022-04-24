import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthProvider from "$lib/components/common/auth";
import LoginPage from "$lib/pages/auth/login";
import RegisterPage from "$lib/pages/auth/register";
import HomePage from "$lib/pages/home";
import Shell from "$lib/pages/home/components/shell";
import DocumentPage from "$lib/pages/home/[docId]";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route index element={<HomePage />} />
            <Route path="d">
              <Route path=":docId" element={<DocumentPage />} />
            </Route>
          </Route>
          {/* Auth Route */}
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="login" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
