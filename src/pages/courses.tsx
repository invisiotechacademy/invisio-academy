import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { supabase } from "@/lib/supabase"

export default function CoursesPage() {
  const [courses, setCourses] =
    useState<any[]>([])

  const [filteredCourses, setFilteredCourses] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  const [search, setSearch] =
    useState("")

  useEffect(() => {
    fetchCourses()
  }, [])

  useEffect(() => {
    filterCourses()
  }, [search, courses])

  async function fetchCourses() {
    const response =
      await supabase
        .from("courses")
        .select("*")
        .order("created_at", {
          ascending: false,
        })

    if (response.data) {
      setCourses(response.data)

      setFilteredCourses(
        response.data
      )
    }

    setLoading(false)
  }

  function filterCourses() {
    const filtered =
      courses.filter((course) =>
        course.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      )

    setFilteredCourses(filtered)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />

          <p className="mt-6 text-zinc-400">
            Loading courses...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black p-6 text-white lg:p-10">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold">
            Courses
          </h1>

          <p className="mt-3 text-zinc-400">
            Explore your courses 🚀
          </p>
        </div>

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-5 py-4 outline-none md:w-[350px]"
        />
      </div>

      {filteredCourses.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <h2 className="text-3xl font-bold">
            No Courses Found
          </h2>

          <p className="mt-4 text-zinc-500">
            Try another search 😄
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map(
            (course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600"
              >
                <h2 className="text-2xl font-bold">
                  {course.title}
                </h2>

                <p className="mt-4 text-zinc-400">
                  {
                    course.description
                  }
                </p>

                <div className="mt-8">
                  <span className="rounded-2xl bg-white px-4 py-2 font-semibold text-black">
                    Open Course
                  </span>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  )
}