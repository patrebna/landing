import { useState } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import logoUrl from "@/assets/logo.webp";

const navItems = [
  { label: "О боте", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Подписка", href: "#subscription" },
  { label: "FAQ", href: "#faq" },
];

type HeaderProps = {
  variant?: "landing" | "compact";
};

export default function Header({ variant = "landing" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isCompact = variant === "compact";
  const openBot = () => {
    window.open(
      "https://t.me/patrebnaBot?start=source_site",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a
          href={isCompact ? "/" : "#hero"}
          className="flex items-end gap-1.5 text-xl font-semibold"
          onClick={(event) => {
            if (!isCompact) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <img
            src={logoUrl}
            alt="Patrebna"
            className="h-9 w-auto drop-shadow-[0_6px_14px_rgba(15,23,42,0.16)] xl:h-11 dark:drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
          />

          <p className="xl:text-2xl uppercase">patrebna</p>
        </a>

        {!isCompact ? (
          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-600 transition hover:text-brand-primary dark:text-slate-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div
          className={`items-center gap-3 ${
            isCompact ? "flex" : "hidden md:flex"
          }`}
        >
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all duration-200 ease-out hover:border-brand-primary hover:bg-emerald-50 hover:text-brand-primary dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
            aria-label="Переключить тему"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button
            size="sm"
            className={`${isCompact ? "px-3 sm:px-4" : ""} gap-2`}
            onClick={openBot}
          >
            <span className={isCompact ? "hidden sm:inline" : ""}>
              Перейти в бота
            </span>
            <span className={isCompact ? "sm:hidden" : "hidden"}>В бот</span>
            <ArrowUpRight size={16} />
          </Button>
        </div>

        {!isCompact ? (
          <button
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all duration-200 ease-out hover:border-brand-primary hover:bg-emerald-50 hover:text-brand-primary dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300 md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Открыть меню"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        ) : null}
      </div>

      {isOpen && !isCompact ? (
        <div className="border-t border-slate-200/60 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-700 transition hover:text-brand-primary dark:text-slate-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all duration-200 ease-out hover:border-brand-primary hover:bg-emerald-50 hover:text-brand-primary dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
              aria-label="Переключить тему"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button size="sm" className="w-full gap-2" onClick={openBot}>
              Перейти в бот
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
