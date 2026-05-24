import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { supabase } from "@/lib/supabase"

export default function DashboardPage() {
  const [courses, setCourses] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  async function fetchCourses() {
    const response =
      await supabase
        .from("courses")
        .select("*")

    if (response.data) {
      setCourses(response.data)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />

          <p className="mt-6 text-zinc-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-3 text-zinc-400">
          Welcome back 🚀
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <h2 className="text-3xl font-bold">
            No Courses Yet
          </h2>

          <p className="mt-4 text-zinc-500">
            Create your first course 🚀
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600"
            >
              <h2 className="text-2xl font-bold">
                {course.title}
              </h2>

              <p className="mt-4 text-zinc-400">
                {course.description}
              </p>

              <div className="mt-8">
                <span className="rounded-2xl bg-white px-4 py-2 font-semibold text-black">
                  Open Course
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}