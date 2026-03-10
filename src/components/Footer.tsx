import { Instagram, Mail, Phone, Send, ExternalLink } from "lucide-react";

const projectLinks = [
  { label: "Telegram Bot", href: "#" },
  { label: "Telegram Channel", href: "#" },
  { label: "Telegram Chat", href: "#" },
  { label: "TikTok", href: "#" },
];

const contacts = [
  { label: "Telegram", icon: Send, href: "#" },
  { label: "LinkedIn", icon: ExternalLink, href: "#" },
  { label: "Email", icon: Mail, href: "mailto:hello@patrebna.by" },
  { label: "Phone", icon: Phone, href: "tel:+375290000000" },
];

const payments = [
  "Visa",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
  "Samsung Pay",
  "Белкарт",
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white/90 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-4 md:px-6">
        <div className="space-y-3">
          <div className="text-lg font-semibold">PATREBNA</div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            © Patrebna 2023–2025
            <br />
            УНП — XXXXXXXX
          </p>
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
                  className="text-slate-600 transition hover:text-brand-primary dark:text-slate-300"
                >
                  {link.label}
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
                >
                  <contact.icon size={16} />
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Оплата
          </div>
          <div className="flex flex-wrap gap-2">
            {payments.map((payment) => (
              <span
                key={payment}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300"
              >
                {payment}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-2 text-slate-500">
            <Instagram size={16} />
            <span className="text-xs">Социальные сети скоро</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
