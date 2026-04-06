import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import sofaUrl from "@/assets/images/sofa.webp";

const plans = [
  {
    name: "Бесплатный",
    price: 0,
    tag: "Старт",
    description:
      "Отличный способ начать пользоваться ботом и оценить его возможности.",
    note: "Удобно попробовать",
    features: [
      { label: "Обновления раз в 60 минут", available: true },
      { label: "Отслеживание 1 ссылки", available: true },
      { label: "Отсутствие рекламы", available: false },
      { label: "Приоритетная поддержка", available: false },
      { label: "Описание к каждому объявлению", available: false },
      {
        label: "Дополнительные параметры к объявлениям",
        available: false,
      },
      { label: "Просмотр на карте объектов недвижимости", available: false },
      { label: "Ранний доступ к новым функциям", available: false },
      { label: "Эксклюзивные возможности", available: false },
    ],
  },
  {
    name: "Базовый",
    price: 5,
    tag: "Выбор",
    description:
      "Базовый формат объявлений, средняя частота обновлений и никакой рекламы.",
    note: "Цена ниже стаканчика кофе",
    features: [
      { label: "Обновления раз в 30 минут", available: true },
      { label: "Отслеживание 1 ссылки", available: true },
      { label: "Отсутствие рекламы", available: true },
      { label: "Приоритетная поддержка", available: true },
      { label: "Описание к каждому объявлению", available: false },
      {
        label: "Дополнительные параметры к объявлениям",
        available: false,
      },

      { label: "Просмотр на карте объектов недвижимости", available: false },

      { label: "Ранний доступ к новым функциям", available: false },
      { label: "Эксклюзивные возможности", available: false },
    ],
  },
  {
    name: "Основной",
    price: 25,
    tag: "Максимум",
    description:
      "Максимальная скорость, расширенные возможности и никакой рекламы.",
    note: "Всего от 65 копеек в день",
    features: [
      { label: "Обновления раз в 5 минут", available: true },
      { label: "Отслеживание до 3 ссылок", available: true },
      { label: "Отсутствие рекламы", available: true },
      { label: "Приоритетная поддержка", available: true },
      { label: "Описание к каждому объявлению", available: true },
      {
        label: "Дополнительные параметры к обявлениям",
        available: true,
      },
      { label: "Просмотр на карте объектов недвижимости", available: true },
      { label: "Ранний доступ к новым функциям", available: true },
      { label: "Эксклюзивные возможности", available: true },
    ],
  },
];

export default function SubscriptionSection() {
  return (
    <section
      id="subscription"
      className="relative overflow-hidden py-16 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={sofaUrl}
          alt=""
          className="absolute -right-12 hidden md:flex bottom-0 w-[420px] rotate-[10deg] drop-shadow-[0_9px_8px_rgba(0,0,0,0.3)] opacity-90 dark:opacity-75 -top-12 md:right-6 md:w-[520px] lg:w-[600px]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            <Zap size={14} />
            Тарифы
          </div>
          <h2 className="section-title">Выбери подходящий план</h2>
          <p className="section-subtitle">
            Сравни возможности и выбери лучший вариант для себя.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid gap-6 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="glass-card relative overflow-hidden"
            >
              <div className="absolute right-6 top-6 rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-semibold text-brand-secondary">
                {plan.note}
              </div>
              <div className="space-y-5">
                <div>
                  <div className="text-sm uppercase tracking-wide text-slate-500">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                    <>
                      <span>{plan.price}</span>
                      <span className="font-inter text-2xl">ƃ</span>
                    </>
                    <span className="text-base font-normal">/ мес</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-center gap-2 ${
                        feature.available
                          ? "text-slate-600 dark:text-slate-300"
                          : "text-slate-400 line-through"
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        className={
                          feature.available
                            ? "text-emerald-500"
                            : "text-slate-300"
                        }
                      />
                      {feature.label}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
