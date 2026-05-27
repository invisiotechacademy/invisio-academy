import {
  ReactNode,
} from "react";

import {
  Link,
} from "react-router-dom";

import MobileNav from "../mobile-nav";

import { supabase } from "../../lib/supabase";

type Props = {
  children: ReactNode;
};

export default function MainLayout({
  children,
}: Props) {
  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href =
      "/login";
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
          <Link
            to="/"
            className="text-3xl font-black"
          >
            LMS PRO
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            <Link
              to="/"
              className="text-zinc-300 transition hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              to="/courses"
              className="text-zinc-300 transition hover:text-white"
            >
              Courses
            </Link>

            <Link
              to="/certificate"
              className="text-zinc-300 transition hover:text-white"
            >
              Certificates
            </Link>

            <Link
              to="/admin"
              className="text-zinc-300 transition hover:text-white"
            >
              Admin
            </Link>

            <Link
              to="/settings"
              className="text-zinc-300 transition hover:text-white"
            >
              Settings
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/upgrade"
              className="rounded-2xl bg-white px-6 py-3 font-bold text-black"
            >
              Upgrade
            </Link>

            <button
              onClick={
                handleLogout
              }
              className="rounded-2xl border border-white/10 px-6 py-3 font-bold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <MobileNav />
    </div>
  );
}