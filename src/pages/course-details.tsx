import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
};

type Lesson = {
  id: number;
  title: string;
  video_url: string;
  content: string;
};

export default function CourseDetailPage() {
  const { id } =
    useParams();

  const [course, setCourse] =
    useState<Course | null>(
      null
    );

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [
    selectedLesson,
    setSelectedLesson,
  ] = useState<Lesson | null>(
    null
  );

  const [title, setTitle] =
    useState("");

  const [videoUrl,
    setVideoUrl,
  ] = useState("");

  const [content,
    setContent,
  ] = useState("");

  const [role, setRole] =
    useState("");

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<number[]>([]);

  async function getUser() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    const { data } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (data) {
      setRole(data.role);
    }
  }

  async function getCourse() {
    const { data } =
      await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

    if (data) {
      setCourse(data);
    }
  }

  async function getLessons() {
    const { data } =
      await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", id)
        .order("created_at", {
          ascending: true,
        });

    if (data) {
      setLessons(data);

      if (data.length > 0) {
        setSelectedLesson(
          data[0]
        );
      }
    }
  }

  useEffect(() => {
    getUser();
    getCourse();
    getLessons();
  }, []);

  function convertYoutubeUrl(
    url: string
  ) {
    if (
      url.includes("watch?v=")
    ) {
      return url.replace(
        "watch?v=",
        "embed/"
      );
    }

    return url;
  }

  async function createLesson(
    e: React.FormEvent
  ) {
    e.preventDefault();

    await supabase
      .from("lessons")
      .insert([
        {
          course_id: id,
          title,
          video_url:
            convertYoutubeUrl(
              videoUrl
            ),
          content,
        },
      ]);

    setTitle("");
    setVideoUrl("");
    setContent("");

    getLessons();
  }

  function completeLesson() {
    if (!selectedLesson)
      return;

    if (
      completedLessons.includes(
        selectedLesson.id
      )
    )
      return;

    setCompletedLessons([
      ...completedLessons,
      selectedLesson.id,
    ]);
  }

  const progress =
    lessons.length > 0
      ? Math.round(
          (completedLessons.length /
            lessons.length) *
            100
        )
      : 0;

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}

      <div className="w-[340px] border-r border-white/10 bg-zinc-950 p-6">
        <img
          src={
            course.thumbnail_url
          }
          className="mb-6 h-52 w-full rounded-3xl object-cover"
        />

        <h1 className="mb-3 text-4xl font-bold">
          {course.title}
        </h1>

        <p className="mb-6 text-zinc-400">
          {course.description}
        </p>

        {/* PROGRESS */}

        <div className="mb-8">
          <div className="mb-2 flex justify-between text-sm">
            <span>
              Progress
            </span>

            <span>
              {progress}%
            </span>
          </div>

          <div className="h-3 rounded-full bg-zinc-800">
            <div
              className="h-3 rounded-full bg-white"
              style={{
                width:
                  `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* LESSONS */}

        <div className="space-y-3">
          {lessons.map(
            (lesson) => (
              <button
                key={lesson.id}
                onClick={() =>
                  setSelectedLesson(
                    lesson
                  )
                }
                className={`w-full rounded-2xl px-5 py-4 text-left transition ${
                  selectedLesson?.id ===
                  lesson.id
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    {
                      lesson.title
                    }
                  </span>

                  {completedLessons.includes(
                    lesson.id
                  ) && (
                    <span>
                      ✅
                    </span>
                  )}
                </div>
              </button>
            )
          )}
        </div>

        {/* ADMIN */}

        {role === "admin" && (
          <div className="mt-10 rounded-3xl bg-zinc-900 p-5">
            <h2 className="mb-5 text-2xl font-bold">
              Add Lesson
            </h2>

            <form
              onSubmit={
                createLesson
              }
              className="space-y-4"
            >
              <input
                placeholder="Lesson title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl bg-black px-4 py-3 outline-none"
              />

              <input
                placeholder="Youtube URL"
                value={videoUrl}
                onChange={(e) =>
                  setVideoUrl(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl bg-black px-4 py-3 outline-none"
              />

              <textarea
                placeholder="Lesson content"
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                className="h-32 w-full rounded-2xl bg-black px-4 py-3 outline-none"
              />

              <button className="w-full rounded-2xl bg-white py-4 font-bold text-black">
                Create Lesson
              </button>
            </form>
          </div>
        )}
      </div>

      {/* VIDEO */}

      <div className="flex-1 p-10">
        {/* TOPBAR */}

<div className="mb-8 flex items-center justify-between">
  <button
    onClick={() =>
      window.history.back()
    }
    className="rounded-2xl bg-zinc-900 px-6 py-4 font-semibold transition hover:bg-zinc-800"
  >
    ← Back
  </button>

  <div className="flex gap-4">
    <button
      onClick={() =>
        (window.location.href =
          "/")
      }
      className="rounded-2xl bg-zinc-900 px-6 py-4 font-semibold transition hover:bg-zinc-800"
    >
      Dashboard
    </button>

    <button
      onClick={() =>
        (window.location.href =
          "/courses")
      }
      className="rounded-2xl bg-zinc-900 px-6 py-4 font-semibold transition hover:bg-zinc-800"
    >
      Courses
    </button>
  </div>
</div>
        {selectedLesson ? (
          <>
            <div className="mb-8 overflow-hidden rounded-3xl">
              <iframe
                src={
                  selectedLesson.video_url
                }
                className="aspect-video w-full"
                allowFullScreen
              />
            </div>

            <h1 className="mb-6 text-5xl font-bold">
              {
                selectedLesson.title
              }
            </h1>

            <div className="rounded-3xl bg-zinc-900 p-8 text-zinc-300">
              {
                selectedLesson.content
              }
            </div>

            <button
              onClick={
                completeLesson
              }
              className={`mt-8 rounded-2xl px-8 py-4 font-bold ${
                completedLessons.includes(
                  selectedLesson.id
                )
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {completedLessons.includes(
                selectedLesson.id
              )
                ? "Completed"
                : "Mark as Complete"}
            </button>
          </>
        ) : (
          <div className="text-zinc-400">
            No lessons yet
          </div>
        )}
      </div>
    </div>
  );
}