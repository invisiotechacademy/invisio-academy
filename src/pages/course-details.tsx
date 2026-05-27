import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../components/layouts/main-layout";

import Loading from "../components/loading";

import ReviewCard from "../components/review-card";

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

type Lesson = {
  id: string;

  title: string;

  video_url: string;

  position: number;
};

type Review = {
  id: string;

  rating: number;

  comment: string;
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

  const [
    currentLesson,
    setCurrentLesson,
  ] = useState<Lesson | null>(
    null
  );

  const [progress, setProgress] =
    useState(0);

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  useEffect(() => {
    loadCourse();
  }, []);

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
        data: lessonsData,
      } =
        await supabase
          .from("lessons")
          .select("*")
          .eq(
            "course_id",
            id
          )
          .order(
            "position",
            {
              ascending: true,
            }
          );

      setLessons(
        lessonsData || []
      );

      if (
        lessonsData &&
        lessonsData.length > 0
      ) {
        setCurrentLesson(
          lessonsData[0]
        );
      }

      const {
        data: reviewsData,
      } =
        await supabase
          .from("reviews")
          .select("*")
          .eq(
            "course_id",
            id
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      setReviews(
        reviewsData || []
      );

      await loadProgress();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function loadProgress() {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const { data } =
        await supabase
          .from(
            "course_progress"
          )
          .select("*")
          .eq(
            "course_id",
            id
          )
          .eq(
            "user_id",
            user.id
          )
          .single();

      if (data) {
        setProgress(
          data.progress
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function completeLesson(
    lessonId: string
  ) {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      const percentage =
        Math.floor(
          ((lessons.findIndex(
            (l) =>
              l.id ===
              lessonId
          ) +
            1) /
            lessons.length) *
            100
        );

      setProgress(
        percentage
      );

      await supabase
        .from(
          "course_progress"
        )
        .upsert({
          user_id: user.id,

          course_id:
            Number(id),

          progress:
            percentage,
        });

      toast.success(
        "Lesson completed 🚀"
      );
    } catch (error) {
      console.error(error);
    }
  }

  function nextLesson() {
    if (!currentLesson)
      return;

    const currentIndex =
      lessons.findIndex(
        (l) =>
          l.id ===
          currentLesson.id
      );

    const next =
      lessons[
        currentIndex + 1
      ];

    if (next) {
      completeLesson(
        currentLesson.id
      );

      setCurrentLesson(
        next
      );
    } else {
      completeLesson(
        currentLesson.id
      );

      toast.success(
        "Course completed 🚀🔥"
      );
    }
  }

  async function submitReview() {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      if (!comment) {
        toast.error(
          "Write review"
        );

        return;
      }

      await supabase
        .from("reviews")
        .insert({
          user_id: user.id,

          course_id:
            Number(id),

          rating,

          comment,
        });

      toast.success(
        "Review added 🚀"
      );

      setComment("");

      loadCourse();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="p-20 text-white">
          Course not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 p-10">
          <div className="flex flex-col gap-10 xl:flex-row xl:items-center">
            <img
              src={
                course.thumbnail_url
              }
              alt={course.title}
              className="h-[280px] w-full rounded-3xl object-cover xl:w-[500px]"
            />

            <div className="flex-1">
              <div className="mb-5 flex items-center gap-4">
                <h1 className="text-6xl font-bold">
                  {course.title}
                </h1>

                {course.is_premium && (
                  <span className="rounded-full bg-yellow-500 px-5 py-3 text-sm font-bold text-black">
                    PREMIUM
                  </span>
                )}
              </div>

              <p className="max-w-4xl text-2xl text-zinc-400">
                {
                  course.description
                }
              </p>

              <div className="mt-10">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-zinc-500">
                    Course
                    Progress
                  </p>

                  <p className="text-2xl font-bold">
                    {progress}%
                  </p>
                </div>

                <div className="h-5 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    style={{
                      width: `${progress}%`,
                    }}
                    className="h-full rounded-full bg-white transition-all"
                  />
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  to="/courses"
                  className="rounded-2xl border border-white/10 px-8 py-5 text-xl font-bold transition hover:bg-white hover:text-black"
                >
                  Back
                </Link>

                {progress ===
                  100 && (
                  <>
                    <a
                      href={`/quiz/${id}`}
                      className="rounded-2xl bg-green-500 px-8 py-5 text-xl font-bold text-black"
                    >
                      Start Quiz
                    </a>

                    <a
                      href={`/certificate/${id}`}
                      className="rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black"
                    >
                      Certificate
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-[1fr_420px]">
          <div className="p-10">
            {currentLesson ? (
              <>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950">
                  <iframe
                    src={
                      currentLesson.video_url
                    }
                    title={
                      currentLesson.title
                    }
                    className="aspect-video w-full"
                    allowFullScreen
                  />
                </div>

                <div className="mt-10">
                  <p className="text-zinc-500">
                    Current Lesson
                  </p>

                  <h2 className="mt-3 text-5xl font-bold">
                    {
                      currentLesson.title
                    }
                  </h2>

                  <div className="mt-10 flex flex-wrap gap-5">
                    <button
                      onClick={() =>
                        completeLesson(
                          currentLesson.id
                        )
                      }
                      className="rounded-2xl border border-white/10 px-8 py-5 text-xl font-bold transition hover:bg-white hover:text-black"
                    >
                      Mark Complete
                    </button>

                    <button
                      onClick={
                        nextLesson
                      }
                      className="rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black transition hover:scale-[1.02]"
                    >
                      Next Lesson
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-[500px] items-center justify-center rounded-3xl border border-white/10 bg-zinc-950">
                <h2 className="text-4xl font-bold">
                  No lessons yet
                </h2>
              </div>
            )}
          </div>

          <div className="border-l border-white/10 bg-zinc-950 p-8">
            <div className="mb-8">
              <h2 className="text-4xl font-bold">
                Lessons
              </h2>

              <p className="mt-3 text-zinc-500">
                {
                  lessons.length
                }{" "}
                lessons
              </p>
            </div>

            <div className="space-y-5">
              {lessons.map(
                (lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() =>
                      setCurrentLesson(
                        lesson
                      )
                    }
                    className={`w-full rounded-3xl border p-6 text-left transition ${
                      currentLesson?.id ===
                      lesson.id
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-black text-white hover:border-white/30"
                    }`}
                  >
                    <p className="text-sm opacity-70">
                      Lesson{" "}
                      {
                        lesson.position
                      }
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                      {
                        lesson.title
                      }
                    </h3>
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-10">
          <div className="mb-10">
            <h2 className="text-5xl font-bold">
              Reviews
            </h2>

            <p className="mt-3 text-zinc-500">
              Student feedback
            </p>
          </div>

          <div className="mb-10 rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <h3 className="mb-6 text-3xl font-bold">
              Leave Review
            </h3>

            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <button
                    key={star}
                    onClick={() =>
                      setRating(
                        star
                      )
                    }
                    className={`text-4xl ${
                      rating >= star
                        ? "opacity-100"
                        : "opacity-30"
                    }`}
                  >
                    ⭐
                  </button>
                )
              )}
            </div>

            <textarea
              value={comment}
              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }
              placeholder="Write review..."
              className="mt-6 h-40 w-full rounded-2xl border border-white/10 bg-black p-5 outline-none"
            />

            <button
              onClick={
                submitReview
              }
              className="mt-6 rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black"
            >
              Submit Review
            </button>
          </div>

          <div className="grid gap-6">
            {reviews.map(
              (review) => (
                <ReviewCard
                  key={review.id}
                  rating={
                    review.rating
                  }
                  comment={
                    review.comment
                  }
                  user="Student"
                />
              )
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}