import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function CoursesPage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [image, setImage] =
    useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    const { data, error } =
      await supabase
        .from("courses")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (!error && data) {
      setCourses(data);
    }
  }

  async function handleCreateCourse() {
    if (!title) return;

    const {
      error,
    } = await supabase
      .from("courses")
      .insert([
        {
          title,
          description,
          image,
        },
      ]);

    if (!error) {
      setTitle("");
      setDescription("");
      setImage("");

      fetchCourses();
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* SIDEBAR */}

        <div className="w-[260px] border-r border-white/10 bg-zinc-950 p-6">
          <h1 className="mb-10 text-3xl font-bold">
            INVISIO
          </h1>

          <div className="space-y-4">
            <button className="w-full rounded-2xl bg-white px-5 py-4 text-left font-semibold text-black">
              Dashboard
            </button>

            <button className="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-left font-semibold text-white">
              Courses
            </button>
          </div>
        </div>

        {/* CONTENT */}

        <div className="flex-1 p-10">
          {/* HEADER */}

          <div className="mb-10 flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold">
                Courses
              </h1>

              <p className="mt-2 text-zinc-400">
                Manage your academy
              </p>
            </div>

            <div className="flex items-center gap-4">
              <input
                placeholder="Search..."
                className="rounded-2xl border border-white/10 bg-zinc-900 px-5 py-3 outline-none"
              />

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white font-bold text-black">
                I
              </div>
            </div>
          </div>

          {/* CREATE COURSE */}

          <div className="mb-12 rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-xl">
            <h2 className="mb-6 text-3xl font-bold">
              Create New Course
            </h2>

            <div className="grid gap-5">
              <input
                placeholder="Course title"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-white"
              />

              <textarea
                placeholder="Course description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="min-h-[140px] rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-white"
              />

              <input
                placeholder="Thumbnail image URL"
                value={image}
                onChange={(e) =>
                  setImage(
                    e.target.value
                  )
                }
                className="rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-white"
              />

              <button
                onClick={
                  handleCreateCourse
                }
                className="rounded-2xl bg-white py-4 text-lg font-bold text-black transition hover:scale-[1.02]"
              >
                Create Course
              </button>
            </div>
          </div>

          {/* COURSE GRID */}

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-900"
              >
                <img
                  src={
                    course.image ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={course.title}
                  className="h-[220px] w-full object-cover"
                />

                <div className="p-6">
                  <h2 className="mb-3 text-3xl font-bold">
                    {course.title}
                  </h2>

                  <p className="mb-6 line-clamp-3 text-zinc-400">
                    {
                      course.description
                    }
                  </p>

                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                      <span>
                        Progress
                      </span>

                      <span>0%</span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                      <div className="h-full w-[0%] bg-white" />
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/courses/${course.id}`
                      )
                    }
                    className="w-full rounded-2xl bg-white py-4 font-bold text-black transition hover:scale-[1.02]"
                  >
                    Open Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}