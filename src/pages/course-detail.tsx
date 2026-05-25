import { useState } from "react"

import { useParams } from "react-router-dom"

import { useCourseStore } from "../store/course-store"

import { useLessonStore } from "../store/lesson-store"

export default function CourseDetailPage() {
  const { id } = useParams()

  const {
    courses,
    updateProgress,
  } = useCourseStore()

  const { lessons, addLesson } =
    useLessonStore()

  const course = courses.find(
    (course) => course.id === id
  )

  const courseLessons = lessons.filter(
    (lesson) => lesson.courseId === id
  )

  const [title, setTitle] =
    useState("")

  const [duration, setDuration] =
    useState("")

  const [videoUrl, setVideoUrl] =
    useState("")

  if (!course) {
    return (
      <div className="text-white">
        Course not found
      </div>
    )
  }

  function handleAddLesson() {
    if (
      !title ||
      !duration ||
      !videoUrl
    )
      return

    addLesson({
      id: crypto.randomUUID(),

      courseId: id!,

      title,

      duration,

      video_url: videoUrl,
    })

    setTitle("")
    setDuration("")
    setVideoUrl("")
  }

  function handleCompleteLesson() {
    const nextProgress =
      course.progress + 10

    updateProgress(
      course.id,
      nextProgress > 100
        ? 100
        : nextProgress
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

      <div className="mb-10 rounded-3xl border border-white/10 bg-zinc-900 p-8">
        <h2 className="mb-6 text-3xl font-bold">
          Add Lesson
        </h2>

        <div className="grid gap-4">
          <input
            placeholder="Lesson title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
          />

          <input
            placeholder="Duration"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
          />

          <input
            placeholder="Youtube Embed URL"
            value={videoUrl}
            onChange={(e) =>
              setVideoUrl(e.target.value)
            }
            className="rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
          />

          <button
            onClick={handleAddLesson}
            className="rounded-2xl bg-white py-4 font-bold text-black"
          >
            Add Lesson
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {courseLessons.map(
          (lesson, index) => (
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
                  Duration:{" "}
                  {lesson.duration}
                </p>

                <button
                  onClick={
                    handleCompleteLesson
                  }
                  className="mt-6 rounded-2xl bg-white px-6 py-3 font-semibold text-black"
                >
                  Mark as Complete
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}