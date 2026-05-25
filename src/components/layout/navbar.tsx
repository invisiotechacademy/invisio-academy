import { supabase } from "../../lib/supabase"

export default function Navbar() {
  async function handleLogout() {
    await supabase.auth.signOut()

    window.location.href = "/login"
  }

  return (
    <div className="flex items-center justify-between border-b border-zinc-800 bg-black px-6 py-4">
      <h1 className="text-xl font-bold text-white">
        Invisio Academy
      </h1>

      <button
        onClick={handleLogout}
        className="rounded-xl bg-white px-4 py-2 font-medium text-black"
      >
        Logout
      </button>
    </div>
  )
}