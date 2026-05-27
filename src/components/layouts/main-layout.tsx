import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import { supabase } from "../../lib/supabase";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({
  children,
}: Props) {
  const location =
    useLocation();

  const [open, setOpen] =
    useState(false);

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/login";
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* MOBILE TOPBAR */}

      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-zinc-950 p-5 lg:hidden">
        <h1 className="text-2xl font-bold">
          INVISIO
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
        >
          {open ? (
            <X size={32} />
          ) : (
            <Menu size={32} />
          )}
        </button>
      </div>

      {/* SIDEBAR */}

      <div
        className={`fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border-r border-white/10 bg-zinc-950 p-6 transition lg:static lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="mb-12 mt-16 lg:mt-0">
          <h1 className="text-4xl font-bold">
            INVISIO
          </h1>

          <p className="mt-2 text-zinc-500">
            LMS Platform
          </p>
        </div>

        {/* MENU */}

        <div className="space-y-4">
          <Link
            to="/"
            onClick={() =>
              setOpen(false)
            }
            className={`block rounded-2xl px-5 py-4 font-semibold transition ${
              location.pathname ===
              "/"
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/courses"
            onClick={() =>
              setOpen(false)
            }
            className={`block rounded-2xl px-5 py-4 font-semibold transition ${
              location.pathname.includes(
                "/courses"
              )
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            Courses
          </Link>

          <Link
            to="/settings"
            onClick={() =>
              setOpen(false)
            }
            className={`block rounded-2xl px-5 py-4 font-semibold transition ${
              location.pathname ===
              "/settings"
                ? "bg-white text-black"
                : "bg-zinc-900 text-white"
            }`}
          >
            Settings
          </Link>
        </div>

        {/* FOOTER */}

        <div className="mt-auto">
          <button
            onClick={logout}
            className="w-full rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 font-semibold text-red-400 transition hover:bg-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>

      {/* OVERLAY */}

      {open && (
        <div
          onClick={() =>
            setOpen(false)
          }
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
        />
      )}

      {/* CONTENT */}

      <div className="flex-1 pt-24 lg:pt-0">
        {children}
      </div>
    </div>
  );
}