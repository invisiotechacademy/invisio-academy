import Sidebar from "./sidebar"
import Navbar from "./navbar"

export default function DashboardLayout(
  props: any
) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <div className="flex-1">
          {props.children}
        </div>
      </div>
    </div>
  )
}