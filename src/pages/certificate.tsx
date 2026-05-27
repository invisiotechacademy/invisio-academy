import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from "../components/layouts/main-layout";

import Loading from "../components/loading";

import {
  supabase,
} from "../lib/supabase";

type Course = {
  id: string;

  title: string;

  description: string;
};

export default function CertificatePage() {
  const { id } =
    useParams();

  const [loading, setLoading] =
    useState(true);

  const [course, setCourse] =
    useState<Course | null>(
      null
    );

  const [userName, setUserName] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    if (!id) return;

    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (!user) return;

    const profile =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (profile.data) {
      setUserName(
        profile.data.full_name ||
          "Student"
      );
    }

    const courseData =
      await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();

    if (courseData.data) {
      setCourse(
        courseData.data
      );
    }

    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <div className="flex min-h-screen items-center justify-center bg-black p-10 text-white">
        <div className="w-full max-w-5xl rounded-[40px] border border-white/10 bg-zinc-950 p-16 text-center shadow-2xl">
          <p className="text-xl uppercase tracking-[10px] text-zinc-500">
            Certificate
          </p>

          <h1 className="mt-6 text-7xl font-bold">
            INVISIO
          </h1>

          <p className="mt-10 text-2xl text-zinc-400">
            This certificate is proudly presented to
          </p>

          <h2 className="mt-8 text-6xl font-bold">
            {userName}
          </h2>

          <p className="mt-10 text-2xl text-zinc-400">
            for successfully completing
          </p>

          <h3 className="mt-6 text-5xl font-bold">
            {course?.title}
          </h3>

          <div className="mt-20 flex items-center justify-between">
            <div>
              <p className="text-zinc-500">
                Date
              </p>

              <p className="mt-2 text-2xl font-bold">
                {new Date().toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-zinc-500">
                Platform
              </p>

              <p className="mt-2 text-2xl font-bold">
                INVISIO Academy
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              window.print()
            }
            className="mt-14 rounded-2xl bg-white px-8 py-4 text-xl font-bold text-black"
          >
            Download PDF
          </button>
        </div>
      </div>
    </MainLayout>
  );
}