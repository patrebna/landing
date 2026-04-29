import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ArrowUpRight, Gift, LogOut, Radio, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfileInitials, getTelegramDisplayName } from "@/lib/auth";
import { type AuthSession, type UserStats } from "@/types/auth";

type ProfileDialogProps = {
  isOpen: boolean;
  session: AuthSession;
  onClose: () => void;
  onSignOut: () => void;
};

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/75">
      <span className="text-sm text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <span className="text-right text-sm font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </span>
    </div>
  );
}

function getSubscriptionTitle(status?: string) {
  const normalizedStatus = status?.toUpperCase?.() ?? "NONE";
  const titles: Record<string, string> = {
    MAIN: "Основная",
    BASE: "Базовая",
    FREE: "Бесплатная",
    EXPIRED: "Истекла",
    NONE: "Неактивна",
  };

  return titles[normalizedStatus] ?? status ?? "Неактивна";
}

export default function ProfileDialog({
  isOpen,
  session,
  onClose,
  onSignOut,
}: ProfileDialogProps) {
  const queryClient = useQueryClient();

  if (!isOpen) {
    return null;
  }

  const { telegramUser } = session;
  const { data, isLoading } = useQuery({
    queryKey: ["auth-profile"],
    queryFn: async () => {
      const response = await axios.get<{ stats: UserStats | null }>(
        "/api/auth/profile",
        { withCredentials: true },
      );
      return response.data.stats;
    },
    enabled: isOpen,
    staleTime: 5 * 60 * 1000,
  });

  const profile = data ?? null;
  const displayName = getTelegramDisplayName(telegramUser);
  const username = telegramUser.username ? `@${telegramUser.username}` : "";
  const subscriptionLabel = profile?.subscription
    ? `${getSubscriptionTitle(profile.subscription)}${
        profile.subscriptionEnd
          ? ` до ${new Date(profile.subscriptionEnd).toLocaleDateString("ru-RU")}`
          : ""
      }`
    : "Неактивна";
  const registrationDateLabel = profile?.registrationDate
    ? new Date(profile.registrationDate).toLocaleDateString("ru-RU")
    : "—";

  const updateUrlStatus = useMutation({
    mutationFn: async ({ url, status }: { url: string; status: boolean }) => {
      const response = await axios.patch<{ stats: UserStats }>(
        "/api/auth/profile/url-status",
        { url, status },
        { withCredentials: true },
      );
      return response.data.stats;
    },
    onSuccess: (stats) => {
      queryClient.setQueryData(["auth-profile"], stats);
    },
  });

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
        aria-label="Закрыть профиль"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.22)] dark:border-slate-800 dark:bg-slate-950">
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),_transparent_72%)] dark:bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.16),_transparent_72%)]" />
        <div className="relative p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {telegramUser.photoUrl ? (
                <img
                  src={telegramUser.photoUrl}
                  alt={displayName}
                  className="h-16 w-16 rounded-full object-cover shadow-[0_18px_40px_rgba(16,185,129,0.22)]"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-semibold text-white shadow-[0_18px_40px_rgba(16,185,129,0.35)]">
                  {getProfileInitials(telegramUser)}
                </div>
              )}
              <div>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {displayName}
                </p>
                <p className="mt-1 min-h-[20px] text-sm text-slate-500 dark:text-slate-400">
                  {username}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-brand-primary hover:text-brand-primary dark:border-slate-700 dark:text-slate-300 dark:hover:border-emerald-500/50 dark:hover:text-emerald-300"
              onClick={onClose}
              aria-label="Закрыть"
            >
              <X size={18} />
            </button>
          </div>

          {profile ? (
            <div className="mt-6 space-y-3">
              <ProfileRow
                label="Дата регистрации"
                value={registrationDateLabel}
              />
              <ProfileRow label="Подписка" value={subscriptionLabel} />
            </div>
          ) : (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50/90 p-5 dark:border-slate-700 dark:bg-slate-900/70">
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {isLoading
                  ? "Подгружаем профиль..."
                  : "Профиль Patrebna пока не активирован"}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {isLoading
                  ? "Забираем статистику пользователя из базы и скоро покажем детали подписки."
                  : "Telegram уже подключен, но в базе Patrebna вы еще не зарегистрированы. Перейдите в бота и завершите регистрацию, чтобы увидеть подписку, бонусы и отслеживаемые ссылки."}
              </p>
            </div>
          )}

          {profile ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/65">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  <Gift size={16} />
                  Бонусы
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {profile.wallet}
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/65">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  <Users size={16} />
                  Рефералы
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {profile.referralsCount}
                </div>
              </div>
            </div>
          ) : null}

          {profile?.urls?.length ? (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
                <Radio size={16} />
                Отслеживаемые ссылки
              </div>
              <div className="space-y-3">
                {profile.urls.map((item) => {
                  const isPending =
                    updateUrlStatus.isPending &&
                    updateUrlStatus.variables?.url === item.url;

                  return (
                    <div
                      key={item.url}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/75"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                          {item.url}
                        </div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          Объявлений: {item.adsCount}
                        </div>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={item.status}
                          disabled={isPending}
                          onChange={(event) => {
                            updateUrlStatus.mutate({
                              url: item.url,
                              status: event.target.checked,
                            });
                          }}
                        />
                        <div className="relative h-6 w-11 rounded-full bg-slate-300 transition peer-checked:bg-emerald-500 peer-disabled:opacity-60 dark:bg-slate-700" />
                        <span className="pointer-events-none absolute left-[2px] top-[2px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 peer-checked:translate-x-5" />
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              className="w-full gap-2"
              onClick={() => {
                window.open(
                  "https://t.me/patrebnaBot?start=source_site",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              Перейти в бота
              <ArrowUpRight size={16} />
            </Button>
            <Button
              variant="secondary"
              className="w-full gap-2"
              onClick={onSignOut}
            >
              <LogOut size={16} />
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
