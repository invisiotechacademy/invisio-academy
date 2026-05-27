import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

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
};

type Progress = {
  course_id: number;

  progress: number;
};

export default function DashboardPage() {
  const [loading, setLoading] =
    useState(true);

  const [courses, setCourses] =
    useState<Course[]>([]);

  const [progressData, setProgressData] =
    useState<Progress[]>([]);

  const [userName, setUserName] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (user) {
        setUserName(
          user.email || "Student"
        );

        const {
          data: progress,
        } =
          await supabase
            .from(
              "course_progress"
            )
            .select("*")
            .eq(
              "user_id",
              user.id
            );

        setProgressData(
          progress || []
        );
      }

      const { data: courses } =
        await supabase
          .from("courses")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      setCourses(courses || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getProgress(
    courseId: number
  ) {
    const found =
      progressData.find(
        (p) =>
          p.course_id ===
          courseId
      );

    return found?.progress || 0;
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
        <div className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="mb-3 text-zinc-500">
              Welcome back 👋
            </p>

            <h1 className="text-7xl font-bold">
              {userName
                .split("@")[0]
                .toUpperCase()}
            </h1>

            <p className="mt-5 max-w-2xl text-2xl text-zinc-400">
              Continue learning
              and level up your
              skills 🚀
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <p className="text-zinc-500">
                Courses
              </p>

              <h2 className="mt-3 text-5xl font-bold">
                {courses.length}
              </h2>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
              <p className="text-zinc-500">
                Progress
              </p>

              <h2 className="mt-3 text-5xl font-bold">
                {
                  progressData.length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-5xl font-bold">
              Continue Learning
            </h2>

            <Link
              to="/courses"
              className="rounded-2xl border border-white/10 px-6 py-4 text-lg font-semibold transition hover:bg-white hover:text-black"
            >
              Browse Courses
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition hover:-translate-y-1"
              >
                <img
                  src={
                    course.thumbnail_url
                  }
                  alt={course.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-8">
                  <h3 className="text-3xl font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-4 line-clamp-2 text-zinc-400">
                    {
                      course.description
                    }
                  </p>

                  <div className="mt-8">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-zinc-500">
                        Progress
                      </p>

                      <p className="font-bold">
                        {getProgress(
                          course.id
                        )}
                        %
                      </p>
                    </div>

                    <div className="h-4 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        style={{
                          width: `${getProgress(
                            course.id
                          )}%`,
                        }}
                        className="h-full rounded-full bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}