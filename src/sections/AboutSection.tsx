import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import plantUrl from "@/assets/images/plant.webp";

const steps = [
  { title: "Запусти бота", text: "Найди PATREBNA в Telegram и нажми /start." },
  {
    title: "Пройди быструю регистрацию",
    text: "Никаких заполнений — один клик.",
  },
  {
    title: "Добавь ссылку поиска",
    text: "Добавь ссылку на интересующие категории Kufar.",
  },
  {
    title: "Получай уведомления",
    text: "Новые объявления приходят сразу после публикации.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={plantUrl}
          alt=""
          className="absolute hidden md:block md:left-[200px]  lg:left-[600px] -top-12 w-[360px] rotate-[-15deg] drop-shadow-[0_9px_8px_rgba(0,0,0,0.3)] opacity-90 dark:opacity-75"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="space-y-4">
            <h2 className="section-title">Как это работает</h2>
            <p className="section-subtitle">
              Patrebna — простой Telegram-бот для отслеживания новых объявлений
              на Kufar. Настрой фильтры один раз и получай уведомления, когда
              появляются подходящие предложения.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {steps.map((step, index) => (
              <Card key={step.title} className="glass-card">
                <div className="text-xs font-semibold uppercase text-emerald-500">
                  Шаг {index + 1}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {step.text}
                </p>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
