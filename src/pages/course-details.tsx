import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Lesson = {
  id: number;
  title: string;
  video_url: string;
  content: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
};

export default function CourseDetailPage() {
  const { id } = useParams();

  const [course, setCourse] =
    useState<Course | null>(null);

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [selectedLesson, setSelectedLesson] =
    useState<Lesson | null>(null);

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<number[]>([]);

  const [title, setTitle] =
    useState("");

  const [videoUrl, setVideoUrl] =
    useState("");

  const [content, setContent] =
    useState("");

  async function fetchCourse() {
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

  async function fetchLessons() {
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

      const savedLesson =
        localStorage.getItem(
          `lesson-${id}`
        );

      if (savedLesson) {
        const foundLesson =
          data.find(
            (lesson) =>
              lesson.id ===
              Number(savedLesson)
          );

        if (foundLesson) {
          setSelectedLesson(
            foundLesson
          );

          return;
        }
      }

      if (data.length > 0) {
        setSelectedLesson(data[0]);
      }
    }
  }

  useEffect(() => {
    fetchCourse();
    fetchLessons();
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

  async function createLesson() {
    if (!title) return;

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

    fetchLessons();
  }

  function handleSelectLesson(
    lesson: Lesson
  ) {
    setSelectedLesson(lesson);

    localStorage.setItem(
      `lesson-${id}`,
      lesson.id.toString()
    );
  }

  function handleCompleteLesson() {
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
      <div className="p-10 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* SIDEBAR */}

        <div className="w-[340px] border-r border-white/10 bg-zinc-950 p-6">
          <img
            src={
              course.thumbnail_url
            }
            className="mb-6 h-48 w-full rounded-3xl object-cover"
          />

          <h1 className="mb-2 text-3xl font-bold">
            {course.title}
          </h1>

          <p className="mb-6 text-zinc-400">
            {course.description}
          </p>

          {/* PROGRESS */}

          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
              <span>Progress</span>

              <span>
                {progress}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* LESSON COUNT */}

          <div className="mb-6 text-sm text-zinc-500">
            {lessons.length} lessons
          </div>

          {/* LESSON LIST */}

          <div className="space-y-3">
            {lessons.map(
              (lesson) => (
                <button
                  key={lesson.id}
                  onClick={() =>
                    handleSelectLesson(
                      lesson
                    )
                  }
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                    selectedLesson?.id ===
                    lesson.id
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-zinc-900 text-white hover:bg-zinc-800"
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

          {/* CREATE LESSON */}

          <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-900 p-5">
            <h2 className="mb-5 text-2xl font-bold">
              Add Lesson
            </h2>

            <div className="space-y-4">
              <input
                placeholder="Lesson title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
              />

              <input
                placeholder="Youtube URL"
                value={videoUrl}
                onChange={(e) =>
                  setVideoUrl(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
              />

              <textarea
                placeholder="Lesson content"
                value={content}
                onChange={(e) =>
                  setContent(
                    e.target.value
                  )
                }
                className="h-32 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 outline-none"
              />

              <button
                onClick={
                  createLesson
                }
                className="w-full rounded-2xl bg-white py-4 font-bold text-black"
              >
                Create Lesson
              </button>
            </div>
          </div>
        </div>

        {/* PLAYER */}

        <div className="flex-1 p-10">
          {selectedLesson ? (
            <>
              <div className="mb-8 overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  src={
                    selectedLesson.video_url
                  }
                  className="aspect-video w-full"
                  allowFullScreen
                />
              </div>

              <h1 className="mb-5 text-5xl font-bold">
                {
                  selectedLesson.title
                }
              </h1>

              <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8 text-zinc-300">
                {
                  selectedLesson.content
                }
              </div>

              <button
                onClick={
                  handleCompleteLesson
                }
                className={`mt-8 rounded-2xl px-8 py-4 font-bold transition ${
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
    </div>
  );
}