import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import { supabase } from "@/lib/supabase";

type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
};

export default function CoursesPage() {
  const [courses, setCourses] =
    useState<Course[]>([]);

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [thumbnail, setThumbnail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [role, setRole] =
    useState("");

  async function fetchProfile() {
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

  async function fetchCourses() {
    const { data, error } =
      await supabase
        .from("courses")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (!error && data) {
      setCourses(data);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchProfile();
  }, []);

  async function createCourse(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title) return;

    setLoading(true);

    const { error } =
      await supabase
        .from("courses")
        .insert([
          {
            title,
            description,
            thumbnail_url:
              thumbnail,
          },
        ]);

    setLoading(false);

    if (!error) {
      setTitle("");
      setDescription("");
      setThumbnail("");

      fetchCourses();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-8">
        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Courses
            </h1>

            <p className="mt-2 text-zinc-400">
              Welcome to Invisio Academy
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900 px-5 py-3">
            {role === "admin"
              ? "Admin"
              : "Student"}
          </div>
        </div>

        {/* ADMIN CREATE */}

        {role === "admin" && (
          <div className="mb-10 rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <h2 className="mb-6 text-3xl font-bold">
              Create New Course
            </h2>

            <form
              onSubmit={
                createCourse
              }
              className="space-y-5"
            >
              <input
                type="text"
                placeholder="Course title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
              />

              <textarea
                placeholder="Course description"
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="h-40 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
              />

              <input
                type="text"
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) =>
                  setThumbnail(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
              />

              <button
                disabled={loading}
                className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black"
              >
                {loading
                  ? "Creating..."
                  : "Create Course"}
              </button>
            </form>
          </div>
        )}

        {/* COURSES */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="h-56 overflow-hidden bg-zinc-900">
                {course.thumbnail_url ? (
                  <img
                    src={
                      course.thumbnail_url
                    }
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-500">
                    No Thumbnail
                  </div>
                )}
              </div>

              <div className="p-6">
                <h2 className="mb-3 text-3xl font-bold">
                  {course.title}
                </h2>

                <p className="line-clamp-2 text-zinc-400">
                  {
                    course.description
                  }
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}