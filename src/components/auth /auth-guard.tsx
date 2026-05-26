import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { supabase } from "../../lib/supabase";

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({
  children,
}: Props) {
  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      setUser(user);

      setLoading(false);
    }

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}