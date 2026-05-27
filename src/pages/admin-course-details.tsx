import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../components/layouts/main-layout";

import Loading from "../components/loading";

import {
  supabase,
} from "../lib/supabase";

type Lesson = {
  id: string;

  title: string;

  video_url: string;

  position: number;
};

export default function AdminCourseDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [title, setTitle] =
    useState("");

  const [videoUrl, setVideoUrl] =
    useState("");

  useEffect(() => {
    loadLessons();
  }, []);

  async function loadLessons() {
    try {
      setLoading(true);

      const { data } =
        await supabase
          .from("lessons")
          .select("*")
          .eq("course_id", id)
          .order(
            "position",
            {
              ascending: true,
            }
          );

      setLessons(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createLesson() {
    try {
      if (
        !title ||
        !videoUrl
      ) {
        toast.error(
          "Fill all fields"
        );

        return;
      }

      const { error } =
        await supabase
          .from("lessons")
          .insert({
            title,

            video_url:
              videoUrl,

            course_id: id,

            position:
              lessons.length +
              1,
          });

      if (error)
        throw error;

      toast.success(
        "Lesson added 🚀"
      );

      setTitle("");

      setVideoUrl("");

      loadLessons();
    } catch (error: any) {
      toast.error(
        error.message
      );
    }
  }

  async function deleteLesson(
    lessonId: string
  ) {
    try {
      await supabase
        .from("lessons")
        .delete()
        .eq(
          "id",
          lessonId
        );

      toast.success(
        "Lesson deleted"
      );

      loadLessons();
    } catch (error: any) {
      toast.error(
        error.message
      );
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <div className="mb-12">
          <h1 className="text-6xl font-bold">
            Course Lessons
          </h1>

          <p className="mt-4 text-zinc-500">
            Manage lessons 🚀
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10">
          <h2 className="mb-8 text-4xl font-bold">
            Add Lesson
          </h2>

          <div className="space-y-5">
            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Lesson title"
              className="w-full rounded-2xl border border-white/10 bg-black p-5 outline-none"
            />

            <input
              value={videoUrl}
              onChange={(e) =>
                setVideoUrl(
                  e.target.value
                )
              }
              placeholder="YouTube embed URL"
              className="w-full rounded-2xl border border-white/10 bg-black p-5 outline-none"
            />

            <button
              onClick={
                createLesson
              }
              className="w-full rounded-2xl bg-white py-5 text-2xl font-bold text-black"
            >
              Add Lesson
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-6">
          {lessons.map(
            (lesson) => (
              <div
                key={lesson.id}
                className="flex items-center justify-between rounded-3xl border border-white/10 bg-zinc-950 p-8"
              >
                <div>
                  <p className="text-zinc-500">
                    Lesson{" "}
                    {
                      lesson.position
                    }
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {
                      lesson.title
                    }
                  </h2>
                </div>

                <button
                  onClick={() =>
                    deleteLesson(
                      lesson.id
                    )
                  }
                  className="rounded-2xl bg-red-500 px-8 py-4 text-xl font-bold"
                >
                  Delete
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}