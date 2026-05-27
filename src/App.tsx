import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardPage from "./pages/dashboard";

import LoginPage from "./pages/login";

import RegisterPage from "./pages/register";

import CoursesPage from "./pages/courses";

import CourseDetailPage from "./pages/course-detail";

import SettingsPage from "./pages/settings";

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
          element={<RegisterPage />}
        />

        {/* MAIN */}

        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/courses"
          element={<CoursesPage />}
        />

        <Route
          path="/courses/:id"
          element={
            <CourseDetailPage />
          }
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
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