import { Link } from "react-router-dom"
import { courses } from "../data/courses"

export default function CoursesPage() {
  return (
    <div className="text-white">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Courses
          </h1>

          <p className="mt-2 text-zinc-500">
            Continue improving your skills
          </p>
        </div>

        <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-black">
          Browse Courses
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <Link
            to={`/courses/${course.id}`}
            key={course.id}
            className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-600"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={course.image}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold">
                {course.title}
              </h2>

              <p className="mt-3 text-zinc-400">
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