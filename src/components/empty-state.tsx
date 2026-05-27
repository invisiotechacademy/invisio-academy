type Props = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10 text-center">
      <h2 className="text-4xl font-bold">
        {title}
      </h2>

      <p className="mt-4 text-zinc-400">
        {description}
      </p>
    </div>
  );
}