import { useEffect, useState } from "react";

const storageKey = "patrebna-theme";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const initial = stored ?? (media.matches ? "dark" : "light");
    setTheme(initial);
    setIsManual(Boolean(stored));

    const handleChange = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem(storageKey)) return;
      setTheme(event.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    if (isManual) {
      window.localStorage.setItem(storageKey, theme);
    } else {
      window.localStorage.removeItem(storageKey);
    }
  }, [theme, isManual]);

  const toggleTheme = () => {
    setIsManual(true);
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
