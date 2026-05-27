import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/home";

import CoursesPage from "./pages/courses";

import CourseDetailsPage from "./pages/course-detail";

import AdminPage from "./pages/admin";

import SettingsPage from "./pages/settings";

import LandingPage from "./pages/landing";

import UpgradePage from "./pages/upgrade";

import LessonPlayerPage from "./pages/lesson-player";

import CertificatePage from "./pages/certificate";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/landing"
          element={<LandingPage />}
        />

        <Route
          path="/courses"
          element={<CoursesPage />}
        />

        <Route
          path="/courses/:id"
          element={
            <CourseDetailsPage />
          }
        />

        <Route
          path="/admin"
          element={<AdminPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

        <Route
          path="/upgrade"
          element={<UpgradePage />}
        />

        <Route
          path="/lesson/:id"
          element={<LessonPlayerPage />}
        />

        <Route
          path="/certificate"
          element={<CertificatePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}