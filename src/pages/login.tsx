import { useState } from "react"

import { useNavigate } from "react-router-dom"

import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function login() {
    setLoading(true)

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) {
      alert(error.message)

      setLoading(false)

      return
    }

    navigate("/")

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
        <h1 className="mb-8 text-3xl font-bold text-white">
          Login
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-medium text-black"
          >
            {loading
              ? "Loading..."
              : "Login"}
          </button>
        </div>
      </div>
    </div>
  )
}