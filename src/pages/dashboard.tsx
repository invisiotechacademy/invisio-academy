import { useCourseStore } from "../store/course-store"

export default function DashboardPage() {
const { courses } = useCourseStore()  
  return (
    <div className="text-white">
      <div className="mb-12">
        <h1 className="text-5xl font-bold">
          Welcome Back 👋
        </h1>

        <p className="mt-4 text-lg text-zinc-500">
          Continue your learning journey
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-500">
            Total Courses
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            12
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-500">
            Completed
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            4
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-500">
            Hours Watched
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            38h
          </h2>
        </div>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
          <p className="text-zinc-500">
            Certificates
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            7
          </h2>
        </div>
      </div>

      <div>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            Continue Watching
          </h2>

          <button className="text-zinc-400">
            View All
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={course.image}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {course.title}
                </h3>

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

                <button className="mt-6 w-full rounded-2xl bg-white py-4 font-semibold text-black">
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}