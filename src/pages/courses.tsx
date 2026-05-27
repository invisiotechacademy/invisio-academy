import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../components/layouts/main-layout";
import { supabase } from "../lib/supabase";

type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    getCourses();
  }, []);

  async function getCourses() {
    const { data, error } =
      await supabase
        .from("courses")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setCourses(data);
    }
  }

  async function uploadImage() {
    if (!image) return "";

    const fileExt =
      image.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${fileExt}`;

    const { error } =
      await supabase.storage
        .from("course-images")
        .upload(fileName, image);

    if (error) {
      console.log(error);

      toast.error(
        "Image upload failed ❌"
      );

      return "";
    }

    const { data } =
      supabase.storage
        .from("course-images")
        .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function createCourse(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const imageUrl =
      await uploadImage();

    const { error } =
      await supabase
        .from("courses")
        .insert([
          {
            title,
            description,
            thumbnail_url:
              imageUrl,
          },
        ]);

    setLoading(false);

    if (error) {
      console.log(error);

      toast.error(
        "Course create failed ❌"
      );

      return;
    }

    toast.success(
      "Course created 🚀"
    );

    setTitle("");
    setDescription("");
    setImage(null);

    getCourses();
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-6xl font-bold">
              Courses
            </h1>

            <p className="mt-2 text-zinc-500">
              Manage your academy
            </p>
          </div>
        </div>

        {/* CREATE COURSE */}

        <div className="mb-12 rounded-3xl border border-white/10 bg-zinc-950 p-8">
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
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
              required
            />

            <textarea
              placeholder="Course description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="h-40 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target
                    .files?.[0] ||
                    null
                )
              }
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4"
            />

            <button
              disabled={loading}
              className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition hover:opacity-80 disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : "Create Course"}
            </button>
          </form>
        </div>

        {/* COURSES GRID */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition hover:scale-[1.02]"
            >
              <img
                src={
                  course.thumbnail_url ||
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                }
                alt={course.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="mb-3 text-3xl font-bold">
                  {course.title}
                </h2>

                <p className="line-clamp-3 text-zinc-400">
                  {
                    course.description
                  }
                </p>

                <button className="mt-6 w-full rounded-2xl bg-white py-3 font-semibold text-black">
                  Open Course
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}