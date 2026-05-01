import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  LoaderCircle,
  Menu,
  Moon,
  SquareArrowOutUpRight,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/context/AuthContext";
import { getProfileInitials, getTelegramDisplayName } from "@/lib/auth";
import { authProfileQueryKey, fetchAuthProfile } from "@/lib/profile";
import { type TelegramAuthPayload } from "@/types/auth";
import logoUrl from "@/assets/logo.webp";
import ProfileDialog from "@/components/auth/ProfileDialog";
import TelegramSignInControl from "@/components/auth/TelegramSignInControl";

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

function HeaderProfileSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-2.5 py-1.5 dark:border-slate-700 dark:bg-slate-950/80 ${
        compact ? "min-w-[136px]" : "min-w-[152px] sm:min-w-[220px] px-3"
      }`}
      aria-hidden="true"
    >
      <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
      <div
        className={`min-w-0 flex-1 ${compact ? "block" : "hidden sm:block"}`}
      >
        <div className="h-3.5 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        <div className="mt-1.5 h-2.5 w-14 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </div>
      <div
        className={`h-4 w-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800 ${
          compact ? "block" : "hidden sm:block"
        }`}
      />
    </div>
  );
}

export default function Header({ variant = "landing" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(min-width: 768px)").matches;
  });
  const { theme, toggleTheme } = useTheme();
  const queryClient = useQueryClient();
  const { session, isHydrated, isAuthenticating, signInWithTelegram, signOut } =
    useAuth();
  const isCompact = variant === "compact";
  const isCompactMobile = isCompact && !isDesktop;
  const profileName = session
    ? getTelegramDisplayName(session.telegramUser)
    : "";
  const compactProfileName = session?.telegramUser.firstName ?? "";

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const handleAuthAction = async (payload: TelegramAuthPayload) => {
    try {
      await signInWithTelegram(payload);
      setIsOpen(false);
    } catch (error) {
      console.error("Не удалось авторизоваться через Telegram", error);
    }
  };

  const openProfileDialog = async () => {
    setIsProfileLoading(true);

    try {
      await queryClient.fetchQuery({
        queryKey: authProfileQueryKey,
        queryFn: fetchAuthProfile,
        staleTime: 5 * 60 * 1000,
      });
      setIsProfileDialogOpen(true);
      setIsOpen(false);
    } catch (error) {
      console.error("Не удалось загрузить данные профиля", error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/50 bg-white/80 backdrop-blur-lg dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
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

          {isCompact || isDesktop ? (
            <div className="flex items-center justify-end gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all duration-200 ease-out hover:border-brand-primary hover:bg-emerald-50 hover:text-brand-primary dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                aria-label="Переключить тему"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {!isHydrated ? (
                <HeaderProfileSkeleton compact={isCompact} />
              ) : session ? (
                <button
                  type="button"
                  onClick={() => {
                    void openProfileDialog();
                  }}
                  disabled={isProfileLoading}
                  className={[
                    "group flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 py-1.5 text-left text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-brand-primary hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:hover:border-emerald-500/50",
                    isCompactMobile
                      ? "min-w-[136px] px-2.5"
                      : "min-w-[152px] px-3 sm:min-w-[220px]",
                    isProfileLoading ? "opacity-90" : "",
                  ].join(" ")}
                  aria-label="Открыть профиль"
                >
                  {session.telegramUser.photoUrl ? (
                    <img
                      src={session.telegramUser.photoUrl}
                      alt={profileName}
                      className="h-8 w-8 rounded-full object-cover shadow-[0_10px_24px_rgba(16,185,129,0.22)]"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.28)]">
                      {getProfileInitials(session.telegramUser)}
                    </span>
                  )}
                  <span
                    className={`min-w-0 flex-1 ${
                      isCompactMobile ? "block" : "hidden sm:block"
                    }`}
                  >
                    <span className="block max-w-[132px] truncate text-sm font-semibold">
                      {isCompactMobile ? compactProfileName : profileName}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      Профиль
                    </span>
                  </span>
                  {isProfileLoading ? (
                    <LoaderCircle
                      size={16}
                      className={`animate-spin text-brand-primary dark:text-emerald-300 ${
                        isCompactMobile ? "block" : "hidden sm:block"
                      }`}
                    />
                  ) : (
                    <SquareArrowOutUpRight
                      size={16}
                      className={`text-slate-400 transition group-hover:text-brand-primary dark:text-slate-500 dark:group-hover:text-emerald-300 ${
                        isCompactMobile ? "block" : "hidden sm:block"
                      }`}
                    />
                  )}
                </button>
              ) : (
                <TelegramSignInControl
                  compact={isCompact}
                  mobileCompact={isCompactMobile}
                  isLoading={isAuthenticating}
                  onAuth={handleAuthAction}
                />
              )}
            </div>
          ) : null}
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
            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all duration-200 ease-out hover:border-brand-primary hover:bg-emerald-50 hover:text-brand-primary dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
                aria-label="Переключить тему"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {!isHydrated ? (
                <HeaderProfileSkeleton />
              ) : session ? (
                <button
                  type="button"
                  onClick={() => {
                    void openProfileDialog();
                  }}
                  disabled={isProfileLoading}
                  className={[
                    "group flex h-11 min-w-[220px] items-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-3 py-1.5 text-left text-slate-700 shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition-all duration-200 hover:border-brand-primary hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)] dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-100 dark:hover:border-emerald-500/50",
                    isProfileLoading ? "opacity-90" : "",
                  ].join(" ")}
                  aria-label="Открыть профиль"
                >
                  {session.telegramUser.photoUrl ? (
                    <img
                      src={session.telegramUser.photoUrl}
                      alt={profileName}
                      className="h-8 w-8 rounded-full object-cover shadow-[0_10px_24px_rgba(16,185,129,0.22)]"
                    />
                  ) : (
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,185,129,0.28)]">
                      {getProfileInitials(session.telegramUser)}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block max-w-[132px] truncate text-sm font-semibold">
                      {profileName}
                    </span>
                    <span className="block text-xs text-slate-500 dark:text-slate-400">
                      Профиль
                    </span>
                  </span>
                  {isProfileLoading ? (
                    <LoaderCircle
                      size={16}
                      className="animate-spin text-brand-primary dark:text-emerald-300"
                    />
                  ) : (
                    <SquareArrowOutUpRight
                      size={16}
                      className="text-slate-400 transition group-hover:text-brand-primary dark:text-slate-500 dark:group-hover:text-emerald-300"
                    />
                  )}
                </button>
              ) : (
                <TelegramSignInControl
                  isLoading={isAuthenticating}
                  onAuth={handleAuthAction}
                />
              )}
            </div>
          </div>
        ) : null}
      </header>

      {session ? (
        <ProfileDialog
          isOpen={isProfileDialogOpen}
          session={session}
          onClose={() => setIsProfileDialogOpen(false)}
          onSignOut={() => {
            signOut();
            setIsProfileDialogOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
