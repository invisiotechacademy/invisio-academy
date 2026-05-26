import {
  Menu,
  Search,
} from "lucide-react"

import {
  Link,
} from "react-router-dom"

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-black/80 px-4 py-5 backdrop-blur-xl md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 lg:hidden">
            <Menu className="text-white" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 hidden text-sm text-zinc-500 md:block">
              Welcome back to INVISIO
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 md:flex">
            <Search
              size={18}
              className="text-zinc-500"
            />

            <input
              placeholder="Search..."
              className="bg-transparent text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          <Link
            to="/settings"
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white font-bold text-black"
          >
            I
          </Link>
        </div>
      </div>
    </div>
  )
}