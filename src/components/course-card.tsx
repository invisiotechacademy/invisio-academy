import { useNavigate } from "react-router-dom";

type Props = {
  course: {
    id: number;
    title: string;
    description: string;
    thumbnail_url: string;
  };
};

export default function CourseCard({
  course,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-green-500 transition duration-300 hover:scale-[1.02]">
      <img
        src={course.thumbnail_url}
        alt={course.title}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">
        <h2 className="text-3xl font-bold text-white">
          {course.title}
        </h2>

        <p className="text-zinc-400 mt-4">
          {course.description}
        </p>

        <button
          onClick={() =>
            navigate(`/lesson/${course.id}`)
          }
          className="mt-6 bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-2xl font-bold transition"
        >
          Start Course
        </button>
      </div>
    </div>
  );
}