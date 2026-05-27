export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="h-20 w-20 animate-spin rounded-full border-4 border-white border-t-transparent" />

        <p className="mt-6 text-zinc-400">
          Loading...
        </p>
      </div>
    </div>
  );
}