import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
};

export default function CoursesPage() {
  const location =
    useLocation();

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [thumbnail, setThumbnail] =
    useState("");

  async function getUser() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (user) {
      setEmail(user.email || "");

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
  }

  async function getCourses() {
    const { data } =
      await supabase
        .from("courses")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (data) {
      setCourses(data);
    }
  }

  useEffect(() => {
    getUser();
    getCourses();
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/login";
  }

  async function createCourse(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title) return;

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

    setTitle("");
    setDescription("");
    setThumbnail("");

    getCourses();
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}

      <div className="flex w-[270px] flex-col border-r border-white/10 bg-zinc-950 p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            INVISIO
          </h1>

          <p className="mt-2 text-zinc-500">
            LMS Platform
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className={`block rounded-2xl px-5 py-4 font-semibold transition ${
              location.pathname ===
              "/"
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/courses"
            className={`block rounded-2xl px-5 py-4 font-semibold transition ${
              location.pathname ===
              "/courses"
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            Courses
          </Link>

          <button className="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-left font-semibold">
            Settings
          </button>
        </div>

        <div className="mt-auto">
          <div className="mb-5 rounded-2xl border border-white/10 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">
              Logged in as
            </p>

            <p className="mt-2 font-semibold">
              {email}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 font-semibold text-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div className="flex-1 p-10">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">
              Courses
            </h1>

            <p className="mt-3 text-zinc-400">
              Explore your learning
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
          <div className="mb-10 rounded-3xl bg-zinc-900 p-8">
            <h2 className="mb-6 text-3xl font-bold">
              Create Course
            </h2>

            <form
              onSubmit={
                createCourse
              }
              className="space-y-5"
            >
              <input
                placeholder="Course title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl bg-black px-5 py-4 outline-none"
              />

              <textarea
                placeholder="Description"
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="h-32 w-full rounded-2xl bg-black px-5 py-4 outline-none"
              />

              <input
                placeholder="Thumbnail URL"
                value={thumbnail}
                onChange={(e) =>
                  setThumbnail(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl bg-black px-5 py-4 outline-none"
              />

              <button className="w-full rounded-2xl bg-white py-4 font-bold text-black">
                Create Course
              </button>
            </form>
          </div>
        )}

        {/* COURSES */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="overflow-hidden rounded-3xl bg-zinc-900 transition hover:scale-[1.02]"
            >
              <img
                src={
                  course.thumbnail_url
                }
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-3xl font-bold">
                  {course.title}
                </h2>

                <p className="mt-3 line-clamp-2 text-zinc-400">
                  {
                    course.description
                  }
                </p>

                <button className="mt-6 w-full rounded-2xl bg-white px-5 py-4 font-bold text-black">
                  Open Course
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}