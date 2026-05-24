import {
  Routes,
  Route,
} from "react-router-dom"

import DashboardLayout from "./components/layout/dashboard-layout"

import DashboardPage from "./pages/dashboard"

import CoursesPage from "./pages/courses"

import CourseDetailPage from "./pages/course-detail"

import LoginPage from "./pages/login"

import RegisterPage from "./pages/register"

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
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        }
      />

      <Route
        path="/courses"
        element={
          <DashboardLayout>
            <CoursesPage />
          </DashboardLayout>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <DashboardLayout>
            <CourseDetailPage />
          </DashboardLayout>
        }
      />
    </Routes>
  )
}