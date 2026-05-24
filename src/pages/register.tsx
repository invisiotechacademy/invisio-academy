import { useState } from "react"

import { useNavigate, Link } from "react-router-dom"

import { supabase } from "@/lib/supabase"

export default function RegisterPage() {
  const navigate = useNavigate()

  const [name, setName] = useState("")

  const [email, setEmail] = useState("")

  const [password, setPassword] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault()

    setLoading(true)

    const {
      data,
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)

      setLoading(false)

      return
    }

    if (data.user) {
      const { error: profileError } =
        await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            email,
            full_name: name,
            role: "student",
          })

      if (profileError) {
        console.log(profileError)
      }
    }

    alert("Account created successfully!")

    navigate("/login")

    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8">
        <h1 className="mb-2 text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mb-8 text-zinc-400">
          Join INVISIO Academy
        </p>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}