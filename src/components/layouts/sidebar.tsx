import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react"

import {
  Link,
  useLocation,
} from "react-router-dom"

import { supabase } from "../../lib/supabase"

export default function Sidebar() {
  const location = useLocation()

  async function handleLogout() {
    await supabase.auth.signOut()

    window.location.href =
      "/login"
  }

  const links = [
    {
      title: "Dashboard",

      icon: LayoutDashboard,

      href: "/",
    },

    {
      title: "Courses",

      icon: BookOpen,

      href: "/courses",
    },

    {
      title: "Settings",

      icon: Settings,

      href: "/settings",
    },
  ]

  return (
    <div className="hidden min-h-screen w-[280px] border-r border-white/10 bg-zinc-950 p-6 lg:block">
      <div className="mb-12">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-2xl font-black text-black">
            I
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">
              INVISIO
            </h1>

            <p className="text-sm text-zinc-500">
              Academy Platform
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon

          const isActive =
            location.pathname ===
            link.href

          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-semibold transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <Icon size={22} />

              {link.title}
            </Link>
          )
        })}
      </div>

      <button
        onClick={handleLogout}
        className="mt-12 flex w-full items-center gap-4 rounded-2xl border border-white/10 px-5 py-4 text-lg font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
      >
        <LogOut size={22} />

        Logout
      </button>
    </div>
  )
}