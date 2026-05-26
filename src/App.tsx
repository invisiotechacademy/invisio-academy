import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

import DashboardPage from "./pages/dashboard";
import CoursesPage from "./pages/courses";
import CourseDetailPage from "./pages/course-detail";
import SettingsPage from "./pages/settings";

import AuthGuard from "./components/auth/auth-guard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        {/* PRIVATE */}

        <Route
          path="/"
          element={
            <AuthGuard>
              <DashboardPage />
            </AuthGuard>
          }
        />

        <Route
          path="/courses"
          element={
            <AuthGuard>
              <CoursesPage />
            </AuthGuard>
          }
        />

        <Route
          path="/courses/:id"
          element={
            <AuthGuard>
              <CourseDetailPage />
            </AuthGuard>
          }
        />

        <Route
          path="/settings"
          element={
            <AuthGuard>
              <SettingsPage />
            </AuthGuard>
          }
        />

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}