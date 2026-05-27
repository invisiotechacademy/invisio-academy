import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import MainLayout from "../components/layouts/main-layout";

import Loading from "../components/loading";

import {
  supabase,
} from "../lib/supabase";

type Course = {
  id: number;

  title: string;

  description: string;

  thumbnail_url: string;

  is_premium: boolean;
};

export default function AdminPage() {
  const [loading, setLoading] =
    useState(true);

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    thumbnail,
    setThumbnail,
  ] = useState("");

  const [
    isPremium,
    setIsPremium,
  ] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);

      const { data, error } =
        await supabase
          .from("courses")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (error)
        throw error;

      setCourses(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createCourse() {
    try {
      if (
        !title ||
        !description
      ) {
        toast.error(
          "Fill all fields"
        );

        return;
      }

      const { error } =
        await supabase
          .from("courses")
          .insert({
            title,

            description,

            thumbnail_url:
              thumbnail,

            is_premium:
              isPremium,
          });

      if (error)
        throw error;

      toast.success(
        "Course created 🚀"
      );

      setTitle("");

      setDescription("");

      setThumbnail("");

      setIsPremium(false);

      loadCourses();
    } catch (error: any) {
      toast.error(
        error.message
      );
    }
  }

  async function deleteCourse(
    id: number
  ) {
    try {
      const { error } =
        await supabase
          .from("courses")
          .delete()
          .eq("id", id);

      if (error)
        throw error;

      toast.success(
        "Course deleted"
      );

      loadCourses();
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
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-7xl font-bold">
              Admin Panel
            </h1>

            <p className="mt-4 text-2xl text-zinc-500">
              Manage your LMS
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 px-8 py-5">
            <p className="text-zinc-500">
              Total Courses
            </p>

            <h2 className="mt-2 text-5xl font-bold">
              {
                courses.length
              }
            </h2>
          </div>
        </div>

        <div className="grid gap-10 xl:grid-cols-[450px_1fr]">
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <h2 className="mb-8 text-4xl font-bold">
              Create Course
            </h2>

            <div className="space-y-5">
              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Course title"
                className="w-full rounded-2xl border border-white/10 bg-black p-5 text-lg outline-none"
              />

              <textarea
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                placeholder="Course description"
                className="h-40 w-full rounded-2xl border border-white/10 bg-black p-5 text-lg outline-none"
              />

              <input
                value={thumbnail}
                onChange={(e) =>
                  setThumbnail(
                    e.target.value
                  )
                }
                placeholder="Thumbnail URL"
                className="w-full rounded-2xl border border-white/10 bg-black p-5 text-lg outline-none"
              />

              <label className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black p-5">
                <input
                  type="checkbox"
                  checked={
                    isPremium
                  }
                  onChange={(e) =>
                    setIsPremium(
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />

                <span className="text-lg font-semibold">
                  Premium Course
                </span>
              </label>

              <button
                onClick={
                  createCourse
                }
                className="w-full rounded-2xl bg-white py-5 text-2xl font-bold text-black transition hover:scale-[1.02]"
              >
                Create Course
              </button>
            </div>
          </div>

          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-5xl font-bold">
                Courses
              </h2>

              <div className="rounded-2xl border border-white/10 bg-zinc-950 px-6 py-4">
                <p className="text-sm text-zinc-500">
                  Platform Status
                </p>

                <h3 className="text-xl font-bold text-green-400">
                  ONLINE
                </h3>
              </div>
            </div>

            {courses.length ===
            0 ? (
              <div className="flex h-[400px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-950">
                <div className="text-center">
                  <h3 className="text-4xl font-bold">
                    No courses yet
                  </h3>

                  <p className="mt-4 text-zinc-500">
                    Create your
                    first course
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2">
                {courses.map(
                  (course) => (
                    <div
                      key={
                        course.id
                      }
                      className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition hover:-translate-y-1"
                    >
                      <img
                        src={
                          course.thumbnail_url
                        }
                        alt={
                          course.title
                        }
                        className="h-60 w-full object-cover"
                      />

                      <div className="p-8">
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <h3 className="text-3xl font-bold">
                            {
                              course.title
                            }
                          </h3>

                          {course.is_premium && (
                            <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                              PREMIUM
                            </span>
                          )}
                        </div>

                        <p className="line-clamp-3 text-zinc-400">
                          {
                            course.description
                          }
                        </p>

                        <div className="mt-8 flex gap-4">
                          <a
                            href={`/admin/courses/${course.id}`}
                            className="flex-1 rounded-2xl bg-white py-4 text-center text-lg font-bold text-black transition hover:scale-[1.02]"
                          >
                            Manage
                          </a>

                          <button
                            onClick={() =>
                              deleteCourse(
                                course.id
                              )
                            }
                            className="flex-1 rounded-2xl bg-red-500 py-4 text-lg font-bold transition hover:scale-[1.02]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}