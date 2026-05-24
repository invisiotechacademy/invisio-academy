import Sidebar from "./sidebar"

export default function DashboardLayout(
  props: any
) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <div className="flex-1">
        {props.children}
      </div>
    </div>
  )
}