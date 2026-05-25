import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../store/auth-store"

export default function AuthGuard({
  children,
}: any) {
  const session = useAuthStore(
    (state) => state.session
  )

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
