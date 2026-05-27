type Props = {
  rating: number;

  comment: string;

  user: string;
};

export default function ReviewCard({
  rating,
  comment,
  user,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold">
          {user}
        </h3>

        <div className="flex">
          {Array.from({
            length: rating,
          }).map((_, i) => (
            <span
              key={i}
              className="text-2xl"
            >
              ⭐
            </span>
          ))}
        </div>
      </div>

      <p className="text-zinc-400">
        {comment}
      </p>
    </div>
  );
}