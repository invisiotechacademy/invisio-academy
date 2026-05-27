import {
  Link,
} from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-white/10 bg-black p-5 xl:hidden">
      <Link
        to="/"
        className="text-white"
      >
        Home
      </Link>

      <Link
        to="/courses"
        className="text-white"
      >
        Courses
      </Link>

      <Link
        to="/admin"
        className="text-white"
      >
        Admin
      </Link>

      <Link
        to="/settings"
        className="text-white"
      >
        Settings
      </Link>
    </div>
  );
}