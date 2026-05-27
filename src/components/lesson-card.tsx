import toast from "react-hot-toast";

import {
  supabase,
} from "../lib/supabase";

type Props = {
  lesson: {
    id: string;

    title: string;

    video_url: string;
  };

  completed: boolean;

  refresh: () => void;
};

export default function LessonCard({
  lesson,
  completed,
  refresh,
}: Props) {
  async function markComplete() {
    try {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) return;

      await supabase
        .from(
          "lesson_progress"
        )
        .insert({
          user_id:
            user.id,

          lesson_id:
            lesson.id,

          completed: true,
        });

      toast.success(
        "Lesson completed 🚀"
      );

      refresh();
    } catch (error: any) {
      toast.error(
        error.message
      );
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          {lesson.title}
        </h2>

        {completed ? (
          <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black">
            COMPLETED
          </span>
        ) : (
          <button
            onClick={
              markComplete
            }
            className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black"
          >
            Mark Complete
          </button>
        )}
      </div>

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
  );
}