import { Link } from "react-router-dom"

import { Course } from "../../types/course"

export default function CourseCard({
  course,
}: {
  course: Course
}) {
  return (
    <Link to={`/courses/${course.id}`}>
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700 hover:scale-[1.01]">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-52 w-full object-cover"
        />

        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
              {course.category}
            </span>

            <span
              className={`text-xs ${
                course.published
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {course.published
                ? "Published"
                : "Draft"}
            </span>
          </div>

          <h2 className="text-xl font-semibold">
            {course.title}
          </h2>

          <p className="mt-2 text-sm text-zinc-400">
            Instructor: {course.instructor}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold">
              ${course.price}
            </span>

            <span className="text-sm text-zinc-400">
              {course.students} students
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}