import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const benefits = [
  "обновления в 6 раз чаще",
  "отслеживание до 3 ссылок",
  "ранний доступ к новым функциям",
  "приоритетная поддержка",
  "эксклюзивные возможности",
];

export default function SubscriptionSection() {
  return (
    <section id="subscription" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Zap size={14} />
              Подписка
            </div>
            <h2 className="section-title">Прокачай возможности бота</h2>
            <p className="section-subtitle">
              Подписка открывает дополнительные возможности и делает
              отслеживание объявлений еще быстрее.
            </p>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-card relative overflow-hidden">
              <div className="absolute right-6 top-6 rounded-full bg-brand-secondary/10 px-3 py-1 text-xs font-semibold text-brand-secondary">
                Всего от 65 копеек в день
              </div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm uppercase tracking-wide text-slate-500">
                    Подписка
                  </div>
                  <div className="text-3xl font-semibold">
                    25 BYN <span className="text-base font-normal">/ мес</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Попробуй и отмени в любой момент
                  </div>
                </div>
                <Button size="lg" className="w-full">
                  Подключить подписку
                </Button>
                <p className="text-xs text-slate-500">
                  Оплата через банковские карты или Apple Pay / Google Pay.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
