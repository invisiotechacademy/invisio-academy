import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import MainLayout from "../components/layouts/main-layout";

import {
  supabase,
} from "../lib/supabase";

type Course = {
  id: number;

  title: string;

  description: string;

  thumbnail_url: string;

  created_at: string;

  is_premium: boolean;
};

type Lesson = {
  id: number;

  title: string;

  content: string;

  duration: number;

  video_url: string;

  course_id: number;
};

type Review = {
  id: number;

  rating: number;

  comment: string;

  created_at: string;
};

export default function CourseDetailsPage() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [course, setCourse] =
    useState<Course | null>(
      null
    );

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [
    averageRating,
    setAverageRating,
  ] = useState(0);

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<number[]>(
    []
  );

  useEffect(() => {
    loadCourse();
  }, [id]);

  async function loadCourse() {
    try {
      setLoading(true);

      const {
        data: courseData,
      } =
        await supabase
          .from("courses")
          .select("*")
          .eq("id", id)
          .single();

      setCourse(courseData);

      const {
        data: lessonData,
      } =
        await supabase
          .from("lessons")
          .select("*")
          .eq("course_id", id)
          .order("id");

      setLessons(
        lessonData || []
      );

      const {
        data: reviewData,
      } =
        await supabase
          .from("reviews")
          .select("*")
          .eq("course_id", id)
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      setReviews(
        reviewData || []
      );

      if (
        reviewData &&
        reviewData.length > 0
      ) {
        const avg =
          reviewData.reduce(
            (acc, item) =>
              acc +
              item.rating,
            0
          ) /
          reviewData.length;

        setAverageRating(avg);
      }

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (user) {
        const {
          data: progress,
        } =
          await supabase
            .from(
              "lesson_progress"
            )
            .select("*")
            .eq(
              "user_id",
              user.id
            )
            .eq(
              "completed",
              true
            );

        if (progress) {
          setCompletedLessons(
            progress.map(
              (item) =>
                item.lesson_id
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function calculateProgress() {
    if (
      lessons.length === 0
    )
      return 0;

    return Math.round(
      (completedLessons.length /
        lessons.length) *
        100
    );
  }

  if (loading || !course) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center bg-black text-3xl text-white">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white">
        <div className="relative h-[500px] overflow-hidden">
          <img
            src={
              course.thumbnail_url
            }
            alt={course.title}
            className="h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="absolute bottom-0 left-0 w-full p-10">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-wrap items-center gap-4">
                {course.is_premium && (
                  <span className="rounded-full bg-yellow-500 px-5 py-2 text-sm font-bold text-black">
                    PREMIUM
                  </span>
                )}

                <span className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm">
                  ⭐{" "}
                  {averageRating.toFixed(
                    1
                  )}
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-7xl font-black leading-none">
                {course.title}
              </h1>

              <p className="mt-8 max-w-3xl text-2xl text-zinc-300">
                {
                  course.description
                }
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                {lessons[0] && (
                  <Link
                    to={`/lesson/${lessons[0].id}`}
                    className="rounded-2xl bg-white px-10 py-5 text-xl font-bold text-black"
                  >
                    Start Course
                  </Link>
                )}

                <button className="rounded-2xl border border-white/20 bg-white/10 px-10 py-5 text-xl font-bold">
                  Add Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-10 py-20">
          <div className="grid gap-10 xl:grid-cols-[1fr_380px]">
            <div>
              <div className="rounded-[30px] border border-white/10 bg-zinc-950 p-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-500">
                      Course Progress
                    </p>

                    <h2 className="mt-3 text-5xl font-black">
                      {
                        calculateProgress()
                      }
                      %
                    </h2>
                  </div>

                  <div className="text-right">
                    <p className="text-zinc-500">
                      Lessons
                    </p>

                    <h3 className="mt-3 text-4xl font-bold">
                      {
                        completedLessons.length
                      }
                      /
                      {
                        lessons.length
                      }
                    </h3>
                  </div>
                </div>

                <div className="mt-10 h-5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-white"
                    style={{
                      width: `${calculateProgress()}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-10 rounded-[30px] border border-white/10 bg-zinc-950 p-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-5xl font-black">
                    Course Lessons
                  </h2>

                  <span className="rounded-full border border-white/10 px-5 py-2 text-sm">
                    {
                      lessons.length
                    }{" "}
                    Lessons
                  </span>
                </div>

                <div className="mt-10 space-y-5">
                  {lessons.map(
                    (lesson) => {
                      const completed =
                        completedLessons.includes(
                          lesson.id
                        );

                      return (
                        <div
                          key={
                            lesson.id
                          }
                          className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-black p-8 xl:flex-row xl:items-center xl:justify-between"
                        >
                          <div className="flex items-center gap-5">
                            <div
                              className={`flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-black ${
                                completed
                                  ? "bg-green-500 text-black"
                                  : "bg-zinc-900"
                              }`}
                            >
                              {completed
                                ? "✓"
                                : "▶"}
                            </div>

                            <div>
                              <h3 className="text-2xl font-bold">
                                {
                                  lesson.title
                                }
                              </h3>

                              <p className="mt-2 text-zinc-500">
                                {
                                  lesson.duration
                                }{" "}
                                minutes
                              </p>
                            </div>
                          </div>

                          <Link
                            to={`/lesson/${lesson.id}`}
                            className="rounded-2xl bg-white px-8 py-4 text-center text-lg font-bold text-black"
                          >
                            Watch Lesson
                          </Link>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="mt-10 rounded-[30px] border border-white/10 bg-zinc-950 p-10">
                <h2 className="text-5xl font-black">
                  Student Reviews
                </h2>

                <div className="mt-10 space-y-6">
                  {reviews.map(
                    (review) => (
                      <div
                        key={
                          review.id
                        }
                        className="rounded-3xl border border-white/10 bg-black p-8"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-yellow-400">
                            {"⭐".repeat(
                              review.rating
                            )}
                          </div>

                          <span className="text-zinc-500">
                            {new Date(
                              review.created_at
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="mt-5 text-xl text-zinc-300">
                          {
                            review.comment
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <aside>
              <div className="sticky top-10 rounded-[30px] border border-white/10 bg-zinc-950 p-10">
                <h2 className="text-4xl font-black">
                  Course Stats
                </h2>

                <div className="mt-10 space-y-6">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black p-6">
                    <p className="text-zinc-400">
                      Lessons
                    </p>

                    <h3 className="text-3xl font-bold">
                      {
                        lessons.length
                      }
                    </h3>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black p-6">
                    <p className="text-zinc-400">
                      Rating
                    </p>

                    <h3 className="text-3xl font-bold">
                      ⭐{" "}
                      {averageRating.toFixed(
                        1
                      )}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black p-6">
                    <p className="text-zinc-400">
                      Level
                    </p>

                    <h3 className="text-3xl font-bold">
                      Pro
                    </h3>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black p-6">
                    <p className="text-zinc-400">
                      Duration
                    </p>

                    <h3 className="text-3xl font-bold">
                      {lessons.reduce(
                        (
                          acc,
                          lesson
                        ) =>
                          acc +
                          lesson.duration,
                        0
                      )}
                      m
                    </h3>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}