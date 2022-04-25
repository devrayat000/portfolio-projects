import { lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthProvider from "$lib/components/common/auth";
import Shell from "$lib/pages/home/components/shell";
import Lazy from "$lib/components/common/lazy";
import { DemoStepper, steps } from "$lib/pages/auth/register";
import { Stepper } from "@mantine/core";

const LoginPage = lazy(() => import("$lib/pages/auth/login"));
const RegisterPage = lazy(() => import("$lib/pages/auth/register"));
const HomePage = lazy(() => import("$lib/pages/home"));
const DocumentPage = lazy(() => import("$lib/pages/home/[docId]"));

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Shell />}>
            <Route index element={<Lazy element={<HomePage />} />} />
            <Route path="d">
              <Route
                path=":docId"
                element={<Lazy element={<DocumentPage />} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Route>
          {/* Auth Route */}
          <Route path="auth">
            <Route path="login" element={<Lazy element={<LoginPage />} />} />
            <Route path="register">
              <Route path=":tab" element={<Lazy element={<DemoStepper />} />} />
            </Route>
            <Route path="*" element={<Navigate to="login" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
