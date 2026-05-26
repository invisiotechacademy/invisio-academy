import { useState } from "react"

import { Link } from "react-router-dom"

import { useCourseStore } from "../store/course-store"

export default function CoursesPage() {
  const { courses, addCourse } =
    useCourseStore()

  const [title, setTitle] =
    useState("")

  const [description, setDescription] =
    useState("")

  const [image, setImage] =
    useState("")

  function handleCreateCourse() {
    if (
      !title ||
      !description ||
      !image
    )
      return

    addCourse({
      id: crypto.randomUUID(),

      title,

      description,

      image,

      progress: 0,
    })

    setTitle("")
    setDescription("")
    setImage("")
  }

  return (
    <div className="text-white">
      <div className="mb-12">
        <h1 className="text-5xl font-bold">
          Courses
        </h1>

        <p className="mt-4 text-zinc-500">
          Manage your academy courses
        </p>
      </div>

      <div className="mb-12 rounded-3xl border border-white/10 bg-zinc-900 p-8">
        <h2 className="mb-6 text-3xl font-bold">
          Create Course
        </h2>

        <div className="grid gap-4">
          <input
            placeholder="Course title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
          />

          <textarea
            placeholder="Course description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            className="min-h-[120px] rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
          />

          <input
            placeholder="Thumbnail URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
          />

          <button
            onClick={handleCreateCourse}
            className="rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02]"
          >
            Create Course
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-zinc-800"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={course.image}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-bold">
                {course.title}
              </h2>

              <p className="mt-3 text-zinc-500">
                {course.description}
              </p>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-zinc-500">
                    Progress
                  </span>

                  <span>
                    {course.progress}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}