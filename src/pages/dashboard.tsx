import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import MainLayout from "../components/layouts/main-layout";

import Topbar from "../components/topbar";

import Loading from "../components/loading";

import EmptyState from "../components/empty-state";

import { supabase } from "../lib/supabase";

type Stats = {
  users: number;
  courses: number;
  lessons: number;
  progress: number;
};

type Enrollment = {
  id: number;
  course_id: string;
  courses: {
    id: string;
    title: string;
    thumbnail_url: string;
    description: string;
  };
};

export default function DashboardPage() {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<Stats>({
      users: 0,
      courses: 0,
      lessons: 0,
      progress: 0,
    });

  const [
    enrollments,
    setEnrollments,
  ] = useState<
    Enrollment[]
  >([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await Promise.all([
      getStats(),
      getEnrollments(),
    ]);

    setLoading(false);
  }

  async function getStats() {
    const users =
      await supabase
        .from("profiles")
        .select("*", {
          count: "exact",
          head: true,
        });

    const courses =
      await supabase
        .from("courses")
        .select("*", {
          count: "exact",
          head: true,
        });

    const lessons =
      await supabase
        .from("lessons")
        .select("*", {
          count: "exact",
          head: true,
        });

    const progress =
      await supabase
        .from(
          "lesson_progress"
        )
        .select("*", {
          count: "exact",
          head: true,
        });

    setStats({
      users:
        users.count || 0,

      courses:
        courses.count || 0,

      lessons:
        lessons.count || 0,

      progress:
        progress.count || 0,
    });
  }

  async function getEnrollments() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    const { data } =
      await supabase
        .from("enrollments")
        .select(
          `
          *,
          courses (
            id,
            title,
            thumbnail_url,
            description
          )
        `
        )
        .eq("user_id", user.id);

    if (data) {
      setEnrollments(data);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <Topbar title="Dashboard" />

        {/* STATS */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Total Users
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              {stats.users}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Total Courses
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              {stats.courses}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Total Lessons
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              {stats.lessons}
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Completed Lessons
            </p>

            <h2 className="mt-4 text-5xl font-bold">
              {stats.progress}
            </h2>
          </div>
        </div>

        {/* CONTINUE */}

        <div className="mt-14">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold">
              Continue Learning
            </h2>

            <Link
              to="/courses"
              className="rounded-2xl bg-white px-5 py-3 font-bold text-black"
            >
              Browse Courses
            </Link>
          </div>

          {enrollments.length ===
          0 ? (
            <EmptyState
              title="No enrolled courses"
              description="Enroll into a course to continue learning 🚀"
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {enrollments.map(
                (
                  enrollment
                ) => (
                  <Link
                    key={
                      enrollment.id
                    }
                    to={`/courses/${enrollment.courses.id}`}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition hover:scale-[1.02]"
                  >
                    <img
                      src={
                        enrollment
                          .courses
                          .thumbnail_url
                      }
                      alt={
                        enrollment
                          .courses
                          .title
                      }
                      className="h-56 w-full object-cover"
                    />

                    <div className="p-6">
                      <h2 className="mb-3 text-3xl font-bold">
                        {
                          enrollment
                            .courses
                            .title
                        }
                      </h2>

                      <p className="line-clamp-3 text-zinc-400">
                        {
                          enrollment
                            .courses
                            .description
                        }
                      </p>

                      <button className="mt-6 w-full rounded-2xl bg-white py-3 font-semibold text-black">
                        Continue
                      </button>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}