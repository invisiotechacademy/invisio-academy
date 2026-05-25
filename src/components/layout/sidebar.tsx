import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"

const links = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },

  {
    name: "Courses",
    path: "/courses",
    icon: BookOpen,
  },

  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <div className="hidden w-[280px] border-r border-white/10 bg-black lg:flex lg:flex-col">
      <div className="border-b border-white/10 p-8">
        <h1 className="text-3xl font-black tracking-tight text-white">
          INVISIO
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Academy Platform
        </p>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon

            const active =
              location.pathname === link.path

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-medium transition ${
                  active
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <Icon size={22} />

                {link.name}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="border-t border-white/10 p-4">
        <button className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-zinc-400 transition hover:bg-zinc-900 hover:text-white">
          <LogOut size={22} />

          Logout
        </button>
      </div>
    </div>
  )
}