import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

import DashboardLayout from "./components/layout/dashboard-layout"

import DashboardPage from "./pages/dashboard"
import CoursesPage from "./pages/courses"
import CourseDetailPage from "./pages/course-detail"

import LoginPage from "./pages/login"
import RegisterPage from "./pages/register"

import AuthGuard from "./components/auth/auth-guard"

export default function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      <Route
        path="/"
        element={
          <AuthGuard>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </AuthGuard>
        }
      />

      <Route
        path="/courses"
        element={
          <AuthGuard>
            <DashboardLayout>
              <CoursesPage />
            </DashboardLayout>
          </AuthGuard>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <AuthGuard>
            <DashboardLayout>
              <CourseDetailPage />
            </DashboardLayout>
          </AuthGuard>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  )
}