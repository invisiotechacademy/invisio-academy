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

export default function DashboardPage() {
  const location =
    useLocation();

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [email, setEmail] =
    useState("");

  async function getUser() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (user) {
      setEmail(user.email || "");
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

        {/* MENU */}

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

          <Link
            to="/settings"
            className={`block rounded-2xl px-5 py-4 font-semibold transition ${
              location.pathname ===
              "/settings"
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            Settings
          </Link>
        </div>

        {/* USER */}

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
            className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div className="flex-1 p-10">
        <div className="mb-12">
          <h1 className="text-6xl font-bold">
            Dashboard
          </h1>

          <p className="mt-3 text-zinc-400">
            Welcome back 👋
          </p>
        </div>

        {/* STATS */}

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-zinc-900 p-8">
            <p className="text-zinc-400">
              Courses
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              {courses.length}
            </h2>
          </div>

          <div className="rounded-3xl bg-zinc-900 p-8">
            <p className="text-zinc-400">
              Progress
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              45%
            </h2>
          </div>

          <div className="rounded-3xl bg-zinc-900 p-8">
            <p className="text-zinc-400">
              Certificates
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              3
            </h2>
          </div>

          <div className="rounded-3xl bg-zinc-900 p-8">
            <p className="text-zinc-400">
              Hours
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              28h
            </h2>
          </div>
        </div>

        {/* COURSES */}

        <div>
          <h2 className="mb-8 text-4xl font-bold">
            Continue Learning
          </h2>

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
                  <h3 className="text-3xl font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-zinc-400">
                    {
                      course.description
                    }
                  </p>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-sm">
                      <span>
                        Progress
                      </span>

                      <span>
                        45%
                      </span>
                    </div>

                    <div className="h-3 rounded-full bg-zinc-800">
                      <div className="h-3 w-[45%] rounded-full bg-white" />
                    </div>
                  </div>

                  <button className="mt-6 w-full rounded-2xl bg-white px-5 py-4 font-bold text-black">
                    Continue Learning
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}