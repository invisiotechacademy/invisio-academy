import { lessons } from "../data/lessons"

export default function CourseDetailPage() {
  return (
    <div className="text-white">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          React Masterclass
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-500">
          Learn React from zero to advanced
          level with real-world projects.
        </p>
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