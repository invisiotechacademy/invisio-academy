import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme =
  | "dark"
  | "light";

type ThemeContextType = {
  theme: Theme;

  toggleTheme: () => void;
};

const ThemeContext =
  createContext<
    ThemeContextType | null
  >(null);

export function ThemeProvider(
  props: any
) {
  const [theme, setTheme] =
    useState<Theme>("dark");

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "theme"
      ) as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);

      document.documentElement.classList.remove(
        "light"
      );

      document.documentElement.classList.remove(
        "dark"
      );

      document.documentElement.classList.add(
        savedTheme
      );
    } else {
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  function toggleTheme() {
    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(newTheme);

    localStorage.setItem(
      "theme",
      newTheme
    );

    document.documentElement.classList.remove(
      "light"
    );

    document.documentElement.classList.remove(
      "dark"
    );

    document.documentElement.classList.add(
      newTheme
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(
      ThemeContext
    );

  if (!context) {
    throw new Error(
      "Theme error"
    );
  }

  return context;
}