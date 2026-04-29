import { useEffect, useMemo, useRef } from "react";
import { type TelegramAuthPayload } from "@/types/auth";

declare global {
  interface Window {
    [key: string]: unknown;
  }
}

type TelegramLoginWidgetProps = {
  onAuth: (payload: TelegramAuthPayload) => void | Promise<void>;
  disabled?: boolean;
};

const TELEGRAM_WIDGET_SCRIPT_URL =
  "https://telegram.org/js/telegram-widget.js?22";

export default function TelegramLoginWidget({
  onAuth,
  disabled = false,
}: TelegramLoginWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const callbackName = useMemo(
    () => `patrebnaTelegramAuth_${Math.random().toString(36).slice(2)}`,
    [],
  );
  const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;

  useEffect(() => {
    if (!botUsername) {
      console.warn(
        "Telegram login widget не инициализирован: отсутствует VITE_TELEGRAM_BOT_USERNAME",
      );
      return;
    }

    if (!containerRef.current || !botUsername || disabled) {
      return;
    }

    const applyOverlayStyles = () => {
      const host = containerRef.current;

      if (!host) {
        return;
      }

      const iframe = host.querySelector("iframe") as HTMLIFrameElement | null;
      const widgetRoot = iframe?.parentElement as HTMLElement | null;

      host.style.width = "100%";
      host.style.height = "100%";
      host.style.minHeight = "54px";

      if (widgetRoot) {
        widgetRoot.style.width = "100%";
        widgetRoot.style.height = "100%";
        widgetRoot.style.minHeight = "54px";
        widgetRoot.style.position = "absolute";
        widgetRoot.style.inset = "0";
        widgetRoot.style.display = "block";
      }

      if (iframe) {
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.minHeight = "54px";
        iframe.style.display = "block";
        iframe.style.borderRadius = "16px";
      }
    };

    window[callbackName] = (user: TelegramAuthPayload) => {
      void onAuth(user);
    };

    const observer = new MutationObserver(() => {
      applyOverlayStyles();
    });
    observer.observe(containerRef.current, { childList: true, subtree: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = TELEGRAM_WIDGET_SCRIPT_URL;
    script.setAttribute("data-telegram-login", botUsername);
    script.setAttribute("data-onauth", `${callbackName}(user)`);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "18");
    script.setAttribute("data-request-access", "write");

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
    window.setTimeout(applyOverlayStyles, 350);

    return () => {
      observer.disconnect();
      delete window[callbackName];
    };
  }, [botUsername, callbackName, disabled, onAuth]);

  if (!botUsername) {
    return null;
  }

  return (
    <div className="relative h-full min-h-[54px] w-full">
      <div
        ref={containerRef}
        className={`absolute inset-0 overflow-hidden rounded-2xl ${
          disabled ? "pointer-events-none opacity-60" : "opacity-[0.01]"
        }`}
      />
    </div>
  );
}
