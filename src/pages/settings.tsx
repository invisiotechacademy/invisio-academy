import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

export default function SettingsPage() {
  const location =
    useLocation();

  const [email, setEmail] =
    useState("");

  const [role, setRole] =
    useState("");

  const [password,
    setPassword,
  ] = useState("");

  async function getUser() {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    if (user) {
      setEmail(user.email || "");

      const { data } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

      if (data) {
        setRole(data.role);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/login";
  }

  async function updatePassword() {
    if (!password) return;

    await supabase.auth.updateUser(
      {
        password,
      }
    );

    alert(
      "Password updated"
    );

    setPassword("");
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* SIDEBAR */}

      <div className="flex w-[270px] flex-col border-r border-white/10 bg-zinc-950 p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">
            INVISIO
          </h1>

          <p className="mt-2 text-zinc-500">
            LMS Platform
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className={`block rounded-2xl px-5 py-4 font-semibold ${
              location.pathname ===
              "/"
                ? "bg-white text-black"
                : "bg-zinc-900"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/courses"
            className={`block rounded-2xl px-5 py-4 font-semibold ${
              location.pathname ===
              "/courses"
                ? "bg-white text-black"
                : "bg-zinc-900"
            }`}
          >
            Courses
          </Link>

          <Link
            to="/settings"
            className={`block rounded-2xl px-5 py-4 font-semibold ${
              location.pathname ===
              "/settings"
                ? "bg-white text-black"
                : "bg-zinc-900"
            }`}
          >
            Settings
          </Link>
        </div>

        <div className="mt-auto">
          <button
            onClick={logout}
            className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}

      <div className="flex-1 p-10">
        <h1 className="mb-10 text-6xl font-bold">
          Settings
        </h1>

        <div className="max-w-2xl space-y-8">
          {/* PROFILE */}

          <div className="rounded-3xl bg-zinc-900 p-8">
            <h2 className="mb-6 text-3xl font-bold">
              Profile
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-zinc-500">
                  Email
                </p>

                <p className="mt-2 text-xl">
                  {email}
                </p>
              </div>

              <div>
                <p className="text-zinc-500">
                  Role
                </p>

                <p className="mt-2 text-xl">
                  {role}
                </p>
              </div>
            </div>
          </div>

          {/* PASSWORD */}

          <div className="rounded-3xl bg-zinc-900 p-8">
            <h2 className="mb-6 text-3xl font-bold">
              Change Password
            </h2>

            <div className="space-y-5">
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl bg-black px-5 py-4 outline-none"
              />

              <button
                onClick={
                  updatePassword
                }
                className="rounded-2xl bg-white px-8 py-4 font-bold text-black"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}