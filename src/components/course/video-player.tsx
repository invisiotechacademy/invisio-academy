export default function VideoPlayer({
  videoUrl,
}: {
  videoUrl: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black">
      <iframe
        className="aspect-video w-full"
        src={videoUrl.replace(
          "watch?v=",
          "embed/"
        )}
        title="Course Video"
        allowFullScreen
      />
    </div>
  )
}

