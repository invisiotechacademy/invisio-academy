import { useParams } from "react-router-dom"

import { lessons } from "../data/lessons"

import { useCourseStore } from "../store/course-store"

export default function CourseDetailPage() {
  const { id } = useParams()

  const { courses } = useCourseStore()

  const course = courses.find(
    (course) => course.id === id
  )

  if (!course) {
    return (
      <div className="text-white">
        Course not found
      </div>
    )
  }

  return (
    <div className="text-white">
      <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
        <div className="aspect-video overflow-hidden">
          <img
            src={course.image}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8">
          <h1 className="text-5xl font-bold">
            {course.title}
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-zinc-500">
            {course.description}
          </p>

          <div className="mt-8">
            <div className="mb-2 flex justify-between">
              <span className="text-zinc-500">
                Course Progress
              </span>

              <span>
                {course.progress}%
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-black">
              <div
                className="h-full rounded-full bg-white"
                style={{
                  width: `${course.progress}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
          >
            <div className="aspect-video">
              <iframe
                src={lesson.video_url}
                className="h-full w-full"
                allowFullScreen
              />
            </div>

            <div className="p-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-bold text-black">
                  {index + 1}
                </div>

                <h2 className="text-2xl font-bold">
                  {lesson.title}
                </h2>
              </div>

              <p className="text-zinc-500">
                Duration: {lesson.duration}
              </p>

              <button className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-black">
                Mark as Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}