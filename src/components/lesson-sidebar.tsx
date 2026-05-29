import { PlayCircle } from "lucide-react";

type Props = {
  lessons: any[];
  currentLesson: any;
  setCurrentLesson: (lesson: any) => void;
};

export default function LessonSidebar({
  lessons,
  currentLesson,
  setCurrentLesson,
}: Props) {
  return (
    <div className="w-[320px] bg-zinc-950 border-r border-zinc-800 h-screen overflow-y-auto">
      <div className="p-5 border-b border-zinc-800">
        <h2 className="text-white text-2xl font-bold">
          Course Lessons
        </h2>
      </div>

      <div className="p-3 space-y-2">
        {lessons.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setCurrentLesson(lesson)}
            className={`w-full text-left p-4 rounded-xl transition flex items-center gap-3 ${
              currentLesson?.id === lesson.id
                ? "bg-green-500 text-black"
                : "bg-zinc-900 text-white hover:bg-zinc-800"
            }`}
          >
            <PlayCircle size={20} />
            <span>{lesson.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}