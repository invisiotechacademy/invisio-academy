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

  is_premium: boolean;
};

export default function CoursesPage() {
  const [loading, setLoading] =
    useState(true);

  const [courses, setCourses] =
    useState<Course[]>([]);

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

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (user) {
        const {
          data: profile,
        } =
          await supabase
            .from("profiles")
            .select("*")
            .eq(
              "id",
              user.id
            )
            .single();

        if (profile) {
          setIsPremium(
            profile.is_premium
          );
        }
      }

      const { data } =
        await supabase
          .from("courses")
          .select("*")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      setCourses(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
        <div className="mb-14 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-zinc-500">
              Course Library
            </p>

            <h1 className="mt-3 text-7xl font-black">
              Explore Courses
            </h1>
          </div>

          {!isPremium && (
            <Link
              to="/upgrade"
              className="rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black transition hover:scale-[1.02]"
            >
              Upgrade Premium
            </Link>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map(
            (course) => {
              const locked =
                course.is_premium &&
                !isPremium;

              return (
                <div
                  key={course.id}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950"
                >
                  <div className="relative">
                    <img
                      src={
                        course.thumbnail_url
                      }
                      alt={
                        course.title
                      }
                      className={`h-64 w-full object-cover ${
                        locked
                          ? "opacity-40"
                          : ""
                      }`}
                    />

                    {locked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-2xl bg-black/80 px-8 py-5 text-2xl font-bold">
                          🔒 Premium
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-3xl font-bold">
                        {
                          course.title
                        }
                      </h2>

                      {course.is_premium && (
                        <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                          PRO
                        </span>
                      )}
                    </div>

                    <p className="line-clamp-3 text-zinc-400">
                      {
                        course.description
                      }
                    </p>

                    {locked ? (
                      <Link
                        to="/upgrade"
                        className="mt-8 block rounded-2xl bg-white py-5 text-center text-xl font-bold text-black"
                      >
                        Upgrade Access
                      </Link>
                    ) : (
                      <Link
                        to={`/courses/${course.id}`}
                        className="mt-8 block rounded-2xl border border-white/10 py-5 text-center text-xl font-bold transition hover:bg-white hover:text-black"
                      >
                        Open Course
                      </Link>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </MainLayout>
  );
}