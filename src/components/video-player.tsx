type Props = {
  videoUrl: string;
};

export default function VideoPlayer({ videoUrl }: Props) {
  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black">
      <iframe
        className="w-full h-full"
        src={videoUrl}
        title="Lesson Video"
        allowFullScreen
      />
    </div>
  );
}