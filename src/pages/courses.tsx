import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchCourses() {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCourses(data);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function createCourse(e: React.FormEvent) {
    e.preventDefault();

    if (!title) return;

    setLoading(true);

    const { error } = await supabase.from("courses").insert([
      {
        title,
        description,
        thumbnail_url: thumbnail,
      },
    ]);

    setLoading(false);

    if (!error) {
      setTitle("");
      setDescription("");
      setThumbnail("");
      fetchCourses();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl p-8">
        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold">Courses</h1>
            <p className="mt-2 text-zinc-400">
              Manage your academy platform
            </p>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-2xl border border-white/10 bg-zinc-900 px-5 py-3 outline-none"
            />

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black font-bold">
              I
            </div>
          </div>
        </div>

        {/* CREATE COURSE */}

        <div className="mb-10 rounded-3xl border border-white/10 bg-zinc-950 p-8">
          <h2 className="mb-6 text-3xl font-bold">
            Create New Course
          </h2>

          <form
            onSubmit={createCourse}
            className="space-y-5"
          >
            <input
              type="text"
              placeholder="Course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
            />

            <textarea
              placeholder="Course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-40 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Thumbnail image URL"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
            />

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition hover:opacity-80"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>

        {/* COURSES GRID */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
            >
              {/* IMAGE */}

              <div className="h-56 w-full overflow-hidden bg-zinc-900">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-500">
                    No Thumbnail
                  </div>
                )}
              </div>

              {/* CONTENT */}

              <div className="p-6">
                <h3 className="mb-3 text-3xl font-bold">
                  {course.title}
                </h3>

                <p className="mb-6 line-clamp-2 text-zinc-400">
                  {course.description}
                </p>

                {/* PROGRESS */}

                <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                  <span>Progress</span>
                  <span>0%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[0%] rounded-full bg-white"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}