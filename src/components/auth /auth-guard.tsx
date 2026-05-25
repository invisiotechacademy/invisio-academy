import { Navigate } from "react-router-dom"
import { useAuthStore } from "../../store/auth-store"

interface Props {
  children: React.ReactNode
}

export default function AuthGuard({
  children,
}: Props) {
  const session = useAuthStore(
    (state) => state.session
  )

  if (!session) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}