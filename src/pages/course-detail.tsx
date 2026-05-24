import {
  useEffect,
  useState,
} from "react"

import { useParams } from "react-router-dom"

import { supabase } from "@/lib/supabase"

export default function CourseDetailPage() {
  const { id } = useParams()

  const [course, setCourse] =
    useState<any>(null)

  const [lessons, setLessons] =
    useState<any[]>([])

  const [currentLesson, setCurrentLesson] =
    useState<any>(null)

  const [loading, setLoading] =
    useState(true)

  const [lessonTitle, setLessonTitle] =
    useState("")

  const [
    lessonDescription,
    setLessonDescription,
  ] = useState("")

  const [videoUrl, setVideoUrl] =
    useState("")

  useEffect(() => {
    fetchCourse()
  }, [])

  async function fetchCourse() {
    const courseResponse =
      await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single()

    if (courseResponse.data) {
      setCourse(courseResponse.data)
    }

    const lessonsResponse =
      await supabase
        .from("course_lessons")
        .select("*")
        .eq("course_id", id)

    if (lessonsResponse.data) {
      setLessons(
        lessonsResponse.data
      )

      const savedLesson =
        localStorage.getItem(
          "lastLesson"
        )

      if (savedLesson) {
        setCurrentLesson(
          JSON.parse(savedLesson)
        )
      } else if (
        lessonsResponse.data.length > 0
      ) {
        setCurrentLesson(
          lessonsResponse.data[0]
        )
      }
    }

    setLoading(false)
  }

  async function createLesson() {
    if (!lessonTitle || !videoUrl)
      return

    await supabase
      .from("course_lessons")
      .insert({
        course_id: id,
        title: lessonTitle,
        description:
          lessonDescription,
        video_url: videoUrl,
      })

    setLessonTitle("")
    setLessonDescription("")
    setVideoUrl("")

    fetchCourse()
  }

  function nextLesson() {
    if (!currentLesson) return

    const currentIndex =
      lessons.findIndex(
        (lesson) =>
          lesson.id ===
          currentLesson.id
      )

    const next =
      lessons[currentIndex + 1]

    if (next) {
      setCurrentLesson(next)

      localStorage.setItem(
        "lastLesson",
        JSON.stringify(next)
      )
    }
  }

  function previousLesson() {
    if (!currentLesson) return

    const currentIndex =
      lessons.findIndex(
        (lesson) =>
          lesson.id ===
          currentLesson.id
      )

    const previous =
      lessons[currentIndex - 1]

    if (previous) {
      setCurrentLesson(previous)

      localStorage.setItem(
        "lastLesson",
        JSON.stringify(previous)
      )
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />

          <p className="mt-6 text-zinc-400">
            Loading course...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex flex-col xl:flex-row">
        <div className="flex-1 p-4 lg:p-8">
          {currentLesson ? (
            <>
              <div className="overflow-hidden rounded-3xl border border-zinc-800">
                <iframe
                  src={
                    currentLesson.video_url
                  }
                  className="aspect-video w-full"
                  allowFullScreen
                />
              </div>

              <div className="mt-8">
                <h1 className="text-4xl font-bold">
                  {
                    currentLesson.title
                  }
                </h1>

                <p className="mt-4 max-w-3xl text-zinc-400">
                  {
                    currentLesson.description
                  }
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={
                    previousLesson
                  }
                  className="rounded-2xl border border-zinc-700 px-6 py-4"
                >
                  Previous
                </button>

                <button
                  onClick={nextLesson}
                  className="rounded-2xl bg-white px-6 py-4 font-semibold text-black"
                >
                  Next Lesson
                </button>
              </div>

              <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
                <h2 className="mb-6 text-2xl font-bold">
                  Create Lesson
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Lesson title"
                    value={
                      lessonTitle
                    }
                    onChange={(e) =>
                      setLessonTitle(
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none"
                  />

                  <textarea
                    placeholder="Lesson description"
                    value={
                      lessonDescription
                    }
                    onChange={(e) =>
                      setLessonDescription(
                        e.target.value
                      )
                    }
                    className="h-32 w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="YouTube Embed URL"
                    value={videoUrl}
                    onChange={(e) =>
                      setVideoUrl(
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 outline-none"
                  />

                  <button
                    onClick={
                      createLesson
                    }
                    className="w-full rounded-2xl bg-white py-4 font-semibold text-black"
                  >
                    Create Lesson
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-[70vh] items-center justify-center">
              <p className="text-zinc-500">
                No lessons found
              </p>
            </div>
          )}
        </div>

        <div className="w-full border-l border-zinc-800 bg-zinc-950 xl:w-[380px]">
          <div className="border-b border-zinc-800 p-6">
            <h2 className="text-2xl font-bold">
              {course?.title}
            </h2>

            <p className="mt-2 text-zinc-500">
              {lessons.length} lessons
            </p>
          </div>

          <div className="flex flex-col gap-3 p-4">
            {lessons.map((lesson) => {
              const active =
                currentLesson?.id ===
                lesson.id

              return (
                <button
                  key={lesson.id}
                  onClick={() => {
                    setCurrentLesson(
                      lesson
                    )

                    localStorage.setItem(
                      "lastLesson",
                      JSON.stringify(
                        lesson
                      )
                    )
                  }}
                  className={`rounded-2xl border p-5 text-left transition ${
                    active
                      ? "border-white bg-white text-black"
                      : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
                  }`}
                >
                  <h3 className="font-semibold">
                    {lesson.title}
                  </h3>

                  <p
                    className={`mt-2 text-sm ${
                      active
                        ? "text-black/70"
                        : "text-zinc-500"
                    }`}
                  >
                    {
                      lesson.description
                    }
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}