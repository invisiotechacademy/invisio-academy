type Props = {
  totalLessons: number;

  completedLessons: number;
};

export default function CourseProgress({
  totalLessons,
  completedLessons,
}: Props) {
  const percentage =
    totalLessons === 0
      ? 0
      : Math.round(
          (completedLessons /
            totalLessons) *
            100
        );

  return (
    <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-950 p-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Course Progress
        </h2>

        <span className="text-2xl font-bold">
          {percentage}%
        </span>
      </div>

      <div className="h-5 overflow-hidden rounded-full bg-zinc-800">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className="h-full rounded-full bg-white transition-all"
        />
      </div>

      <p className="mt-4 text-zinc-400">
        {completedLessons} /
        {totalLessons} lessons
        completed
      </p>
    </div>
  );
}