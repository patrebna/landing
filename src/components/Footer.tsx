import paymentMethodsUrl from "@/assets/payment-methods.svg";
import iconBotUrl from "@/assets/icon-bot.svg";
import iconChatUrl from "@/assets/icon-chat.svg";
import iconGroupUrl from "@/assets/icon-group.svg";
import iconRobotAltUrl from "@/assets/icon-robot-alt.svg";
import iconSberUrl from "@/assets/icon-sber.svg";
import iconTelegramUrl from "@/assets/icon-telegram.svg";
import iconLinkedinUrl from "@/assets/icon-linkedin.svg";
import iconEmailUrl from "@/assets/icon-email.svg";
import iconPhoneUrl from "@/assets/icon-phone.svg";
import { ArrowUp } from "lucide-react";
import iconInstagramUrl from "@/assets/icon-instagram.svg";
import iconThreadsUrl from "@/assets/icon-threads.svg";
import iconTiktokUrl from "@/assets/icon-tiktok.svg";

const projectLinks = [
  {
    label: "Patrebna Бот",
    href: "https://t.me/PatrebnaBot?start=source_site",
    icon: iconBotUrl,
  },
  {
    label: "Патрэбные новости",
    href: "https://t.me/patrebna_news",
    icon: iconChatUrl,
  },
  {
    label: "Патрэбный чат",
    href: "https://t.me/patrebna_chat",
    icon: iconGroupUrl,
  },
  {
    label: "Nepatrebna Бот",
    href: "https://t.me/nepatrebnaBot",
    icon: iconRobotAltUrl,
  },
  {
    label: "Непатрэбныя товары",
    href: "https://t.me/nepatrebna",
    icon: iconSberUrl,
  },
];

const menuLinks = [
  { label: "О боте", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "FAQ", href: "#faq" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Подписка", href: "#subscription" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/patrebna.by",
    icon: iconInstagramUrl,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@patrebna.by",
    icon: iconThreadsUrl,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@patrebna.by",
    icon: iconTiktokUrl,
  },
];

const contacts = [
  {
    label: "Telegram",
    icon: iconTelegramUrl,
    href: "https://t.me/evgeniykolmak",
  },
  {
    label: "LinkedIn",
    icon: iconLinkedinUrl,
    href: "https://www.linkedin.com/in/evgeniy-kolmak/",
  },
  {
    label: "Почта",
    icon: iconEmailUrl,
    href: "mailto:evgeniy.kolmak@gmail.com",
  },
  { label: "Телефон", icon: iconPhoneUrl, href: "tel:+375297413900" },
];

const isExternalLink = (href: string) => href.startsWith("http");

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/90 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Patrebna
            </div>
            <ul className="space-y-2 text-sm">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-600 transition hover:text-brand-primary dark:text-slate-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden pt-2 sm:block">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-primary dark:text-slate-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900">
                  <ArrowUp
                    size={14}
                    className="opacity-70 transition hover:opacity-100 dark:text-slate-100"
                  />
                </span>
                Наверх
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Проект
            </div>
            <ul className="space-y-2 text-sm">
              {projectLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-slate-600 transition hover:text-brand-primary dark:text-slate-300"
                    target={isExternalLink(link.href) ? "_blank" : undefined}
                    rel={isExternalLink(link.href) ? "noreferrer noopener" : undefined}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900">
                      <img
                        src={link.icon}
                        alt="иконка проекта"
                        className="h-4 w-4 opacity-70 dark:invert"
                      />
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Соцсети
              </div>
              <ul className="flex flex-wrap items-center gap-4 text-sm">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-600 transition hover:text-brand-primary dark:text-slate-300"
                      aria-label={link.label}
                      target={isExternalLink(link.href) ? "_blank" : undefined}
                      rel={isExternalLink(link.href) ? "noreferrer noopener" : undefined}
                    >
                      <img
                        src={link.icon}
                        alt="иконка соцсети"
                        className="h-5 w-5 opacity-70 transition hover:opacity-100 hover:scale-110 dark:invert"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Контакты
              </div>
              <ul className="space-y-2 text-sm">
                {contacts.map((contact) => (
                  <li key={contact.label}>
                    <a
                      href={contact.href}
                      className="flex items-center gap-2 text-slate-600 transition hover:text-brand-primary dark:text-slate-300"
                      target={isExternalLink(contact.href) ? "_blank" : undefined}
                      rel={isExternalLink(contact.href) ? "noreferrer noopener" : undefined}
                    >
                      <img
                        src={contact.icon}
                        alt="иконка контакта"
                        className="h-4 w-4 opacity-70 transition hover:opacity-100 hover:scale-110 dark:invert"
                      />
                      {contact.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-brand-primary dark:text-slate-300"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900">
                  <ArrowUp
                    size={14}
                    className="opacity-70 transition hover:opacity-100 dark:text-slate-100"
                  />
                </span>
                Наверх
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-center md:mt-14">
          <img
            src={paymentMethodsUrl}
            alt="способы оплаты"
            className="h-10 w-auto opacity-70 sm:h-12"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="mt-4 text-center text-xs text-slate-500">
          © Patrebna 2023–2026 | УНП: CE5227258
        </div>
      </div>
    </footer>
  );
}
