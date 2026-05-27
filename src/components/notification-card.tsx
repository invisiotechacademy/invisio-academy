type Props = {
  title: string;

  message: string;
};

export default function NotificationCard({
  title,
  message,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-zinc-400">
        {message}
      </p>
    </div>
  );
}