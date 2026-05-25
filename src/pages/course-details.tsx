import { lessons } from "../data/lessons"

export default function CourseDetailPage() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">
        React Masterclass
      </h1>

      <div className="grid gap-4">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-zinc-900 p-5 rounded-xl border border-zinc-800"
          >
            <h2 className="text-xl font-semibold">
              {lesson.title}
            </h2>

            <p className="text-zinc-400 mt-1">
              {lesson.duration}
            </p>

            <div className="mt-4 aspect-video rounded-lg overflow-hidden">
              <iframe
                src={lesson.video_url}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}