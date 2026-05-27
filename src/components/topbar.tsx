import {
  Bell,
  Search,
} from "lucide-react";

type Props = {
  title: string;
};

export default function Topbar({
  title,
}: Props) {
  return (
    <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      {/* LEFT */}

      <div>
        <h1 className="text-5xl font-bold">
          {title}
        </h1>

        <p className="mt-2 text-zinc-500">
          Welcome back 👋
        </p>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">
        {/* SEARCH */}

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950 px-5 py-3">
          <Search
            size={18}
            className="text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
        </div>

        {/* NOTIFICATION */}

        <button className="rounded-2xl border border-white/10 bg-zinc-950 p-4 transition hover:bg-zinc-900">
          <Bell size={20} />
        </button>
      </div>
    </div>
  );
}