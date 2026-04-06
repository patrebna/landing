import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import monitorUrl from "@/assets/images/monitor.webp";
import qrCodeUrl from "@/assets/qr-code.svg";

const stats = [
  { value: "500+", label: "пользователей" },
  { value: "900 000+", label: "объявлений" },
  { value: "24/7", label: "уведомления" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-hero-gradient pb-16 pt-16 md:pb-24"
    >
      <div className="pointer-events-none hidden md:block absolute inset-0 z-0">
        <img
          src={monitorUrl}
          alt=""
          className="absolute right-24 top-8 xl:w-[620px] lg:w-[520px] hidden lg:block rotate-[16deg] drop-shadow-[0_9px_8px_rgba(0,0,0,0.3)] opacity-90 dark:opacity-75"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_70%,rgba(15,23,42,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,173,100,0.15),transparent_55%)]" />
      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[0.95fr_1.05fr] md:items-stretch md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            <CheckCircle size={14} />
            Новый способ мониторинга Kufar
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Лови новые объявления на Kufar первым
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            PATREBNA автоматически находит новые объявления и отправляет их
            прямо в Telegram. Настрой фильтры один раз и будь первым, кто увидит
            выгодное предложение.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="px-10"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Подробнее
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="glass-card text-center">
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-6 md:self-stretch"
        >
          <Card className="glass-card hidden md:flex relative h-full min-h-[340px] flex-col justify-center overflow-hidden py-4 max-w-[480px] md:ml-auto">
            <div className="absolute hidden md:block right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              QR вход
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="relative rounded-3xl bg-white p-1 shadow-soft">
                <div className="absolute -inset-2 -z-10 rounded-[28px] bg-gradient-to-br from-emerald-200/20 to-sky-200/20 blur-md" />
                <img
                  src={qrCodeUrl}
                  alt="QR код для перехода в бот"
                  className="h-[320px] w-[320px] rounded-2xl border border-slate-200 bg-white p-0.5 sm:h-[360px] sm:w-[360px]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="text-sm font-semibold">Сканируй и подключайся</p>
                <p className="text-xs text-slate-500">
                  Быстрый переход в Telegram-бот
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
