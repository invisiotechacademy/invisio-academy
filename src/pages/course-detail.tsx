import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Lesson = {
  id: string;
  title: string;
  video_url: string;
  content: string;
};

type Course = {
  id: string;
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
  ] = useState<string[]>([]);

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

        <div className="w-[320px] border-r border-white/10 bg-zinc-950 p-6">
          <h1 className="mb-2 text-3xl font-bold">
            {course.title}
          </h1>

          <p className="mb-8 text-zinc-400">
            {course.description}
          </p>

          {/* LESSON LIST */}

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
                className="w-full rounded-2xl bg-white py-4 font-bold text-black transition hover:opacity-80"
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