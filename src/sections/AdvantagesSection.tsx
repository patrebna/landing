import { motion } from "framer-motion";
import {
  BellRing,
  ShieldCheck,
  Sparkles,
  Timer,
  SlidersHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import lampUrl from "@/assets/images/lamp.webp";

const advantages = [
  {
    title: "Получай первым новые объявления",
    description:
      "Бот отслеживает свежие публикации на Kufar в реальном времени и присылает уведомление.",
    icon: BellRing,
  },
  {
    title: "Гибкие фильтры поиска",
    description:
      "Настраивай категории, цену, регион и ключевые слова под свои цели.",
    icon: SlidersHorizontal,
  },
  {
    title: "Экономия времени",
    description:
      "Не нужно вручную обновлять сайт. Все объявления приходят прямо в Telegram.",
    icon: Timer,
  },
  {
    title: "Уведомления 24/7",
    description:
      "Patrebna работает круглосуточно и отслеживает новые объявления.",
    icon: Sparkles,
  },
  {
    title: "Безопасность",
    description: "Бот не собирает личные данные и безопасен для пользователей.",
    icon: ShieldCheck,
  },
];

export default function AdvantagesSection() {
  return (
    <section
      id="advantages"
      className="relative overflow-hidden bg-slate-50 py-16 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={lampUrl}
          alt=""
          className="absolute right-6 bottom-12 w-[600px] hidden md:block rotate-[16deg] drop-shadow-[0_9px_8px_rgba(0,0,0,0.3)] opacity-90 dark:opacity-75"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="space-y-3">
          <h2 className="section-title">Преимущества сервиса</h2>
          <p className="section-subtitle">
            PATREBNA помогает быть быстрее конкурентов и находить выгодные
            предложения сразу после публикации.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {advantages.map((item) => (
            <Card key={item.title} className="glass-card">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <item.icon size={22} />
                </span>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
