import Sidebar from "./sidebar"
import Navbar from "./navbar"

interface Props {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}