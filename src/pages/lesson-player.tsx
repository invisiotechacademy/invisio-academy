import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import MainLayout from "../components/layouts/main-layout";

import QuizCard from "../components/quiz-card";

import AIChat from "../components/ai-chat";

import CourseChat from "../components/course-chat";

import {
  supabase,
} from "../lib/supabase";

type Lesson = {
  id: number;

  title: string;

  content: string;

  duration: number;

  video_url: string;

  course_id: number;
};

type Course = {
  id: number;

  title: string;

  description: string;
};

export default function LessonPlayerPage() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [lesson, setLesson] =
    useState<Lesson | null>(
      null
    );

  const [course, setCourse] =
    useState<Course | null>(
      null
    );

  const [lessons, setLessons] =
    useState<Lesson[]>([]);

  const [
    completedLessons,
    setCompletedLessons,
  ] = useState<number[]>(
    []
  );

  useEffect(() => {
    loadLesson();
  }, [id]);

  async function loadLesson() {
    try {
      setLoading(true);

      const {
        data: lessonData,
      } =
        await supabase
          .from("lessons")
          .select("*")
          .eq("id", id)
          .single();

      if (!lessonData)
        return;

      setLesson(lessonData);

      const {
        data: courseData,
      } =
        await supabase
          .from("courses")
          .select("*")
          .eq(
            "id",
            lessonData.course_id
          )
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
            lessonData.course_id
          )
          .order("id");

      setLessons(
        lessonsData || []
      );

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

  async function markComplete() {
    try {
      if (!lesson)
        return;

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user)
        return;

      await supabase
        .from(
          "lesson_progress"
        )
        .upsert({
          user_id: user.id,

          lesson_id: lesson.id,

          completed: true,
        });

      setCompletedLessons(
        (
          prev
        ) => [
          ...prev,
          lesson.id,
        ]
      );

      alert(
        "Lesson completed 🚀"
      );
    } catch (error) {
      console.error(error);
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

  function getNextLesson() {
    if (!lesson)
      return null;

    const currentIndex =
      lessons.findIndex(
        (item) =>
          item.id ===
          lesson.id
      );

    return lessons[
      currentIndex + 1
    ];
  }

  if (loading || !lesson) {
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
      <div className="flex min-h-screen bg-black text-white">
        <div className="flex-1 p-10">
          <div className="overflow-hidden rounded-[35px] border border-white/10 bg-zinc-950">
            <iframe
              src={
                lesson.video_url
              }
              title={
                lesson.title
              }
              className="aspect-video w-full"
              allowFullScreen
            />
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <p className="text-zinc-500">
                  {
                    course?.title
                  }
                </p>

                <h1 className="mt-3 text-6xl font-black">
                  {lesson.title}
                </h1>
              </div>

              <button
                onClick={
                  markComplete
                }
                className="rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black"
              >
                Mark Complete
              </button>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950 p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-500">
                    Progress
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
                    Completed
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

              <div className="mt-8 h-4 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-white"
                  style={{
                    width: `${calculateProgress()}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950 p-10">
              <h2 className="text-4xl font-black">
                Lesson Notes
              </h2>

              <p className="mt-8 whitespace-pre-wrap text-xl leading-relaxed text-zinc-300">
                {lesson.content}
              </p>
            </div>

            <div className="mt-10">
              <QuizCard
                question="What is React?"
                options={[
                  "Framework",
                  "Library",
                  "Database",
                  "Server",
                ]}
                correctAnswer="Library"
              />
            </div>

            <div className="mt-10">
              <AIChat />
            </div>

            <div className="mt-10">
              <CourseChat />
            </div>

            {getNextLesson() && (
              <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950 p-10">
                <p className="text-zinc-500">
                  Next Lesson
                </p>

                <h2 className="mt-4 text-5xl font-black">
                  {
                    getNextLesson()?.title
                  }
                </h2>

                <Link
                  to={`/lesson/${getNextLesson()?.id}`}
                  className="mt-10 inline-block rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black"
                >
                  Continue Learning
                </Link>
              </div>
            )}
          </div>
        </div>

        <aside className="hidden w-[420px] border-l border-white/10 bg-zinc-950 p-8 xl:block">
          <div>
            <p className="text-zinc-500">
              Course Content
            </p>

            <h2 className="mt-3 text-5xl font-black">
              Lessons
            </h2>
          </div>

          <div className="mt-10 space-y-5">
            {lessons.map(
              (item) => {
                const completed =
                  completedLessons.includes(
                    item.id
                  );

                const active =
                  lesson.id ===
                  item.id;

                return (
                  <Link
                    key={item.id}
                    to={`/lesson/${item.id}`}
                    className={`block rounded-3xl border p-6 transition ${
                      active
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-black hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-bold">
                          {
                            item.title
                          }
                        </h3>

                        <p className="mt-3 text-sm opacity-70">
                          {
                            item.duration
                          }{" "}
                          min
                        </p>
                      </div>

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black ${
                          completed
                            ? "bg-green-500 text-black"
                            : "bg-zinc-800 text-white"
                        }`}
                      >
                        {completed
                          ? "✓"
                          : "▶"}
                      </div>
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </aside>
      </div>
    </MainLayout>
  );
}