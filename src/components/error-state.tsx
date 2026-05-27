type Props = {
  message?: string;
};

export default function ErrorState({
  message,
}: Props) {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center">
      <h2 className="text-4xl font-bold text-red-400">
        Something went wrong ❌
      </h2>

      <p className="mt-4 text-zinc-300">
        {message ||
          "Please try again later."}
      </p>
    </div>
  );
}