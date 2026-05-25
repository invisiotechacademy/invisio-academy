import { Search } from "lucide-react"

export default function Navbar() {
  return (
    <div className="border-b border-white/10 bg-black/80 px-8 py-6 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Dashboard
          </h1>

          <p className="mt-1 text-zinc-500">
            Welcome back to INVISIO
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3">
            <Search
              size={18}
              className="text-zinc-500"
            />

            <input
              placeholder="Search..."
              className="bg-transparent text-white outline-none placeholder:text-zinc-500"
            />
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white font-bold text-black">
            I
          </div>
        </div>
      </div>
    </div>
  )
}