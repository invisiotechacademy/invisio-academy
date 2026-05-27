import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import toast from "react-hot-toast";

import {
  Trash2,
} from "lucide-react";

import MainLayout from "../components/layouts/main-layout";

import { supabase } from "../lib/supabase";

import Loading from "../components/loading";

import EmptyState from "../components/empty-state";

import ErrorState from "../components/error-state";

type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
};

export default function CoursesPage() {
  const [courses, setCourses] =
    useState<Course[]>([]);

  const [
    filteredCourses,
    setFilteredCourses,
  ] = useState<Course[]>([]);

  const [search, setSearch] =
    useState("");

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [role, setRole] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [search, courses]);

  async function loadData() {
    await Promise.all([
      getCourses(),
      getProfile(),
    ]);

    setLoading(false);
  }

  function filterCourses() {
    const filtered =
      courses.filter((course) =>
        course.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

    setFilteredCourses(
      filtered
    );
  }

  async function getProfile() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    const { data } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (data) {
      setRole(data.role);
    }
  }

  async function getCourses() {
    const { data, error } =
      await supabase
        .from("courses")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      setError(
        "Failed to load courses"
      );

      return;
    }

    if (data) {
      setCourses(data);

      setFilteredCourses(
        data
      );
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

  async function deleteCourse(
    id: string
  ) {
    const confirmDelete =
      window.confirm(
        "Delete this course?"
      );

    if (!confirmDelete)
      return;

    const { error } =
      await supabase
        .from("courses")
        .delete()
        .eq("id", id);

    if (error) {
      toast.error(
        "Delete failed ❌"
      );

      return;
    }

    toast.success(
      "Course deleted 🗑️"
    );

    getCourses();
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-6xl font-bold">
              Courses
            </h1>

            <p className="mt-2 text-zinc-500">
              Explore academy
            </p>
          </div>

          <div className="rounded-2xl bg-zinc-900 px-5 py-3">
            Role: {role}
          </div>
        </div>

        {/* SEARCH */}

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-5 py-4 outline-none"
          />
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-10">
            <ErrorState
              message={error}
            />
          </div>
        )}

        {/* ADMIN */}

        {role === "admin" && (
          <div className="mb-12 rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <h2 className="mb-6 text-3xl font-bold">
              Create New Course
            </h2>

            <form
              onSubmit={
                createCourse
              }
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
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target
                      .value
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
        )}

        {/* EMPTY */}

        {filteredCourses.length ===
          0 && (
          <EmptyState
            title="No Courses Found"
            description="Try another search or create a new course 🚀"
          />
        )}

        {/* COURSES */}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map(
            (course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950"
              >
                <Link
                  to={`/courses/${course.id}`}
                >
                  <img
                    src={
                      course.thumbnail_url ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                    }
                    alt={
                      course.title
                    }
                    className="h-56 w-full object-cover"
                  />

                  <div className="p-6">
                    <h2 className="mb-3 text-3xl font-bold">
                      {
                        course.title
                      }
                    </h2>

                    <p className="line-clamp-3 text-zinc-400">
                      {
                        course.description
                      }
                    </p>
                  </div>
                </Link>

                <div className="p-6 pt-0">
                  <Link
                    to={`/courses/${course.id}`}
                    className="block w-full rounded-2xl bg-white py-3 text-center font-semibold text-black"
                  >
                    Open Course
                  </Link>

                  {role ===
                    "admin" && (
                    <button
                      onClick={() =>
                        deleteCourse(
                          course.id
                        )
                      }
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-3 font-semibold text-red-400 transition hover:bg-red-500/20"
                    >
                      <Trash2
                        size={
                          18
                        }
                      />
                      Delete Course
                    </button>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
}