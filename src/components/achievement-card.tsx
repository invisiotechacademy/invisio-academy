type Props = {
  title: string;

  description: string;

  icon: string;
};

export default function AchievementCard({
  title,
  description,
  icon,
}: Props) {
  return (
    <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-black p-8">
      <div className="text-6xl">
        {icon}
      </div>

      <h2 className="mt-6 text-3xl font-black">
        {title}
      </h2>

      <p className="mt-4 text-zinc-400">
        {description}
      </p>
    </div>
  );
}