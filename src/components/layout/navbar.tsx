import { supabase } from "../../lib/supabase"

export default function Navbar() {
  async function handleLogout() {
    await supabase.auth.signOut()

    window.location.href = "/login"
  }

  return (
    <div className="border-b border-white/10 bg-black px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          INVISIO Academy
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-white px-4 py-2 font-semibold text-black"
        >
          Logout
        </button>
      </div>
    </div>
  )
}