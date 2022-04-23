import AuthProvider from "$lib/components/common/auth";
import LoginPage from "$lib/pages/auth/login";
import RegisterPage from "$lib/pages/auth/register";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
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
