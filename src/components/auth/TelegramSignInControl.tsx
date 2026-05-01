import { LogIn } from "lucide-react";
import { type TelegramAuthPayload } from "@/types/auth";
import TelegramLoginWidget from "@/components/auth/TelegramLoginWidget";

type TelegramSignInControlProps = {
  onAuth: (payload: TelegramAuthPayload) => void | Promise<void>;
  isLoading?: boolean;
  compact?: boolean;
  className?: string;
};

export default function TelegramSignInControl({
  onAuth,
  isLoading = false,
  compact = false,
  className = "",
}: TelegramSignInControlProps) {
  return (
    <div
      className={`relative h-11 overflow-hidden rounded-2xl ${
        compact ? "min-w-[132px]" : "min-w-[220px]"
      } ${className}`.trim()}
    >
      <div className="pointer-events-none absolute inset-0 z-10 inline-flex h-full w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(16,185,129,0.24)]">
        <span className="whitespace-nowrap">
          {isLoading
            ? compact
              ? "Вход..."
              : "Проверяем вход..."
            : compact
              ? "Войти"
              : "Войти через Telegram"}
        </span>
        <LogIn size={16} />
      </div>
      <div className="absolute inset-0 z-20">
        <TelegramLoginWidget disabled={isLoading} onAuth={onAuth} />
      </div>
    </div>
  );
}
