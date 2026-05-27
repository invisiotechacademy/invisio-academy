import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import DashboardPage from "./pages/dashboard";

import CoursesPage from "./pages/courses";

import CourseDetailsPage from "./pages/course-details";

import LoginPage from "./pages/login";

import RegisterPage from "./pages/register";

import SettingsPage from "./pages/settings";

import CertificatePage from "./pages/certificate";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage />
          }
        />

        <Route
          path="/courses"
          element={
            <CoursesPage />
          }
        />

        <Route
          path="/courses/:id"
          element={
            <CourseDetailsPage />
          }
        />

        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        <Route
          path="/settings"
          element={
            <SettingsPage />
          }
        />

        <Route
          path="/certificate/:id"
          element={
            <CertificatePage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}