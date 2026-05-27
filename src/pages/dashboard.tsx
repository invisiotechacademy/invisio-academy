import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

import MainLayout from "../components/layouts/main-layout";

type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
};

export default function DashboardPage() {
  const [courses, setCourses] =
    useState<Course[]>([]);

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
    getCourses();
  }, []);

  return (
    <MainLayout>
      <div className="p-10">
        <div className="mb-12">
          <h1 className="text-6xl font-bold">
            Dashboard
          </h1>

          <p className="mt-3 text-zinc-400">
            Welcome back 👋
          </p>
        </div>

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

                  <p className="mt-3 text-zinc-400">
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
    </MainLayout>
  );
}