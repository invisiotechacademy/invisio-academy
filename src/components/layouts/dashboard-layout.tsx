import Sidebar from "./sidebar"

import Navbar from "./navbar"

export default function DashboardLayout(
  props: any
) {
  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <div className="p-4 md:p-8">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}