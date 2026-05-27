import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../components/layouts/main-layout";

import { supabase } from "../lib/supabase";

type Lesson = {
  id: number;
  title: string;
  video_url: string;
  content: string;
};

export default function CourseDetailPage() {
  const { id } =
    useParams();

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [
    selectedLesson,
    setSelectedLesson,
  ] = useState<Lesson | null>(
    null
  );

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<number[]>([]);

  const [enrolled, setEnrolled] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const [video, setVideo] =
    useState<File | null>(null);

  const [userId, setUserId] =
    useState("");

  const [role, setRole] =
    useState("");

  useEffect(() => {
    getUser();
    getLessons();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    setUserId(user.id);

    getProgress(user.id);

    checkEnrollment(user.id);

    const { data } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (data) {
      setRole(data.role);
    }
  }

  async function checkEnrollment(
    userId: string
  ) {
    const { data } =
      await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", userId)
        .eq("course_id", id)
        .single();

    if (data) {
      setEnrolled(true);
    }
  }

  async function enrollCourse() {
    const { error } =
      await supabase
        .from("enrollments")
        .insert([
          {
            user_id: userId,
            course_id: id,
          },
        ]);

    if (error) {
      toast.error(
        "Enrollment failed ❌"
      );

      return;
    }

    setEnrolled(true);

    toast.success(
      "Enrolled successfully 🚀"
    );
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

  async function getProgress(
    userId: string
  ) {
    const { data } =
      await supabase
        .from(
          "lesson_progress"
        )
        .select("*")
        .eq("user_id", userId)
        .eq(
          "completed",
          true
        );

    if (data) {
      setCompletedLessons(
        data.map(
          (item) =>
            item.lesson_id
        )
      );
    }
  }

  async function uploadVideo() {
    if (!video) return "";

    const fileExt =
      video.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${fileExt}`;

    const { error } =
      await supabase.storage
        .from("lesson-videos")
        .upload(
          fileName,
          video
        );

    if (error) {
      toast.error(
        "Video upload failed ❌"
      );

      return "";
    }

    const { data } =
      supabase.storage
        .from("lesson-videos")
        .getPublicUrl(
          fileName
        );

    return data.publicUrl;
  }

  async function createLesson(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const videoUrl =
      await uploadVideo();

    const { error } =
      await supabase
        .from("lessons")
        .insert([
          {
            course_id: id,
            title,
            video_url:
              videoUrl,
            content,
          },
        ]);

    if (error) {
      toast.error(
        "Lesson create failed ❌"
      );

      return;
    }

    toast.success(
      "Lesson added 🚀"
    );

    setTitle("");
    setContent("");
    setVideo(null);

    getLessons();
  }

  async function completeLesson() {
    if (!selectedLesson)
      return;

    if (
      completedLessons.includes(
        selectedLesson.id
      )
    )
      return;

    const { error } =
      await supabase
        .from(
          "lesson_progress"
        )
        .insert([
          {
            user_id: userId,
            lesson_id:
              selectedLesson.id,
            completed: true,
          },
        ]);

    if (error) {
      toast.error(
        "Progress failed ❌"
      );

      return;
    }

    setCompletedLessons([
      ...completedLessons,
      selectedLesson.id,
    ]);

    toast.success(
      "Lesson completed ✅"
    );
  }

  const progress =
    lessons.length > 0
      ? Math.round(
          (completedLessons.length /
            lessons.length) *
            100
        )
      : 0;

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <Link
          to="/courses"
          className="mb-8 inline-block rounded-2xl bg-zinc-900 px-5 py-3"
        >
          ← Back
        </Link>

        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Course Detail
            </h1>

            <p className="mt-3 text-zinc-400">
              Progress: {progress}%
            </p>
          </div>

          {!enrolled &&
            role !== "admin" && (
              <button
                onClick={
                  enrollCourse
                }
                className="rounded-2xl bg-white px-8 py-4 font-bold text-black"
              >
                Enroll Course
              </button>
            )}
        </div>

        {!enrolled &&
        role !== "admin" ? (
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10 text-center">
            <h2 className="text-4xl font-bold">
              Enroll Required 🚀
            </h2>

            <p className="mt-4 text-zinc-400">
              You need to enroll to
              access lessons.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 xl:grid-cols-[350px_1fr]">
            {/* LESSONS */}

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
              <h2 className="mb-6 text-3xl font-bold">
                Lessons
              </h2>

              <div className="space-y-4">
                {lessons.map(
                  (lesson) => (
                    <button
                      key={
                        lesson.id
                      }
                      onClick={() =>
                        setSelectedLesson(
                          lesson
                        )
                      }
                      className={`w-full rounded-2xl p-4 text-left transition ${
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
            </div>

            {/* CONTENT */}

            <div>
              {selectedLesson && (
                <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
                  <video
                    controls
                    className="mb-8 w-full rounded-3xl"
                    src={
                      selectedLesson.video_url
                    }
                  />

                  <h2 className="mb-4 text-4xl font-bold">
                    {
                      selectedLesson.title
                    }
                  </h2>

                  <p className="mb-8 text-zinc-400">
                    {
                      selectedLesson.content
                    }
                  </p>

                  <button
                    onClick={
                      completeLesson
                    }
                    className={`rounded-2xl px-8 py-4 font-bold ${
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
                      : "Mark As Complete"}
                  </button>
                </div>
              )}

              {/* ADMIN */}

              {role === "admin" && (
                <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950 p-8">
                  <h2 className="mb-6 text-3xl font-bold">
                    Add Lesson
                  </h2>

                  <form
                    onSubmit={
                      createLesson
                    }
                    className="space-y-5"
                  >
                    <input
                      type="text"
                      placeholder="Lesson title"
                      value={title}
                      onChange={(
                        e
                      ) =>
                        setTitle(
                          e
                            .target
                            .value
                        )
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
                    />

                    <textarea
                      placeholder="Lesson content"
                      value={
                        content
                      }
                      onChange={(
                        e
                      ) =>
                        setContent(
                          e
                            .target
                            .value
                        )
                      }
                      className="h-40 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
                    />

                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={(
                        e
                      ) =>
                        setVideo(
                          e
                            .target
                            .files?.[0] ||
                            null
                        )
                      }
                      className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4"
                    />

                    <button className="w-full rounded-2xl bg-white py-4 font-bold text-black">
                      Add Lesson
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}