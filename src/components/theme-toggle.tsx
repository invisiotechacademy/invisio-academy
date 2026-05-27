import {
  Moon,
  Sun,
} from "lucide-react";

import {
  useTheme,
} from "../context/theme-context";

export default function ThemeToggle() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      onClick={
        toggleTheme
      }
      className="rounded-2xl border border-white/10 bg-zinc-950 p-4 transition hover:bg-zinc-900"
    >
      {theme ===
      "dark" ? (
        <Sun size={20} />
      ) : (
        <Moon size={20} />
      )}
    </button>
  );
}