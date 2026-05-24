import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <div className="h-screen w-[260px] border-r border-zinc-800 bg-zinc-950 p-6 text-white">
      <h1 className="text-3xl font-bold">
        LMS
      </h1>

      <div className="mt-10 flex flex-col gap-4">
        <Link
          to="/"
          className="rounded-2xl bg-white px-5 py-4 font-semibold text-black"
        >
          Dashboard
        </Link>

        <Link
          to="/courses"
          className="rounded-2xl bg-zinc-900 px-5 py-4"
        >
          Courses
        </Link>
      </div>
    </div>
  )
}