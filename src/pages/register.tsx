import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please fill all fields"
      );

      return;
    }

    try {
      setLoading(true);

      const {
        data,
        error:
          registerError,
      } =
        await supabase.auth.signUp(
          {
            email,
            password,
          }
        );

      if (registerError) {
        setError(
          registerError.message
        );

        setLoading(false);

        return;
      }

      if (data.user) {
        await supabase
          .from("profiles")
          .insert([
            {
              id: data.user.id,

              email: email,

              role: "student",
            },
          ]);
      }

      setLoading(false);

      navigate("/login");
    } catch (err) {
      setError(
        "Something went wrong"
      );

      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-10">
        <div className="mb-10">
          <h1 className="mb-3 text-5xl font-bold">
            Register
          </h1>

          <p className="text-zinc-400">
            Create your account
          </p>
        </div>

        <form
          onSubmit={
            handleRegister
          }
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none transition focus:border-white"
          />

          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black transition hover:opacity-80"
          >
            {loading
              ? "Creating..."
              : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}