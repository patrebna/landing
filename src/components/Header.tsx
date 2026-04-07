import { useState } from "react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import logoUrl from "@/assets/logo.webp";

const navItems = [
  { label: "О боте", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "FAQ", href: "#faq" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Подписка", href: "#subscription" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <a
          href="#hero"
          className="flex items-center gap-3 text-xl font-semibold"
        >
          <img src={logoUrl} alt="Patrebna" className="xl:h-10 h-8 w-auto" />
          <div className="flex items-center gap-2">
            <p className="xl:text-2xl lg:text-xl">PATREBNA</p>
          </div>
        </a>

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

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-secondary hover:text-brand-secondary dark:border-slate-700 dark:text-slate-200"
            aria-label="Переключить тему"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => {
              window.open(
                "https://t.me/patrebnaBot?start=source_site",
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            Перейти в бот
            <ArrowUpRight size={16} />
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-secondary hover:text-brand-secondary dark:border-slate-700 dark:text-slate-200 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
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
              className="flex min-h-10 min-w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-secondary hover:text-brand-secondary dark:border-slate-700 dark:text-slate-200"
              aria-label="Переключить тему"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button
              size="sm"
              className="w-full gap-2"
              onClick={() => {
                window.open(
                  "https://t.me/patrebnaBot?start=source_site",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              Перейти в бот
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
