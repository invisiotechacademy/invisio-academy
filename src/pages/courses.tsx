import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import MainLayout from "../components/layouts/main-layout";

import Loading from "../components/loading";

import {
  supabase,
} from "../lib/supabase";

type Lesson = {
  id: string;

  title: string;

  video_url: string;
};

type Course = {
  id: string;

  title: string;

  description: string;

  thumbnail_url: string;
};

export default function CourseDetailsPage() {
  const { id } =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [course, setCourse] =
    useState<Course | null>(
      null
    );

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!id) return;

    const courseData =
      await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

    if (courseData.data) {
      setCourse(
        courseData.data
      );
    }

    const lessonsData =
      await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", id);

    if (lessonsData.data) {
      setLessons(
        lessonsData.data
      );
    }

    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <img
          src={
            course?.thumbnail_url
          }
          alt={course?.title}
          className="h-[400px] w-full rounded-3xl object-cover"
        />

        <h1 className="mt-10 text-6xl font-bold">
          {course?.title}
        </h1>

        <p className="mt-6 max-w-4xl text-2xl text-zinc-400">
          {
            course?.description
          }
        </p>

        <div className="mt-14 flex flex-wrap gap-5">
          <Link
            to={`/certificate/${id}`}
            className="rounded-2xl bg-white px-8 py-4 text-xl font-bold text-black"
          >
            Get Certificate
          </Link>

          <Link
            to="/courses"
            className="rounded-2xl border border-white/10 px-8 py-4 text-xl font-bold"
          >
            Back
          </Link>
        </div>

        <div className="mt-16 space-y-8">
          {lessons.map(
            (lesson) => (
              <div
                key={lesson.id}
                className="rounded-3xl border border-white/10 bg-zinc-950 p-8"
              >
                <h2 className="mb-6 text-3xl font-bold">
                  {
                    lesson.title
                  }
                </h2>

                <video
                  controls
                  className="w-full rounded-2xl"
                >
                  <source
                    src={
                      lesson.video_url
                    }
                  />
                </video>
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}