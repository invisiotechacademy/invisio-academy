import { PlayCircle } from "lucide-react"

import { Lesson } from "@/types/lesson"

export default function LessonCard({
  lesson,
}: {
  lesson: Lesson
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-zinc-800 p-3">
          <PlayCircle size={22} />
        </div>

        <div>
          <h3 className="font-medium">
            {lesson.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {lesson.duration}
          </p>
        </div>
      </div>

      {lesson.freePreview && (
        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
          Preview
        </span>
      )}
    </div>
  )
}