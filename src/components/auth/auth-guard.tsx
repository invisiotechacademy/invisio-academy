import { useEffect, useState } from "react"

import { Navigate } from "react-router-dom"

import { supabase } from "@/lib/supabase"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] =
    useState(true)

  const [authenticated, setAuthenticated] =
    useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    setAuthenticated(!!session)

    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    )
  }

  if (!authenticated) {
    return <Navigate to="/login" />
  }

  return children
}