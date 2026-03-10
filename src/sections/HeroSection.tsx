import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import QRCode from "qrcode";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const stats = [
  { value: "300+", label: "пользователей" },
  { value: "400 000", label: "объявлений в базе" },
  { value: "24/7", label: "уведомления" },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = 300;
    const qr = QRCode.create("https://t.me/patrebnaBot?start=source_site", {
      errorCorrectionLevel: "H",
    });
    const cellSize = size / qr.modules.size;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = size;
    canvas.height = size;

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);

    for (let row = 0; row < qr.modules.size; row += 1) {
      for (let col = 0; col < qr.modules.size; col += 1) {
        if (!qr.modules.get(col, row)) continue;
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        const radius = cellSize * 0.38;
        const gradient = context.createLinearGradient(
          x - radius,
          y - radius,
          x + radius,
          y + radius
        );
        gradient.addColorStop(0, "#00ad64");
        gradient.addColorStop(1, "#0088cc");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      }
    }

    const logoWidth = size * 0.58;
    const logoHeight = size * 0.18;
    const logoX = size / 2 - logoWidth / 2;
    const logoY = size / 2 - logoHeight / 2;

    context.fillStyle = "#0f172a";
    context.beginPath();
    context.roundRect(logoX, logoY, logoWidth, logoHeight, 20);
    context.fill();

    context.fillStyle = "#ffffff";
    context.font = "bold 42px \"Montserrat\", sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("Patrebna", size / 2, size / 2 + 2);
  }, []);

  useEffect(() => {
    QRCode.toDataURL(
      "https://t.me/patrebnaBot?start=source_site",
      {
        margin: 1,
        width: 220,
        errorCorrectionLevel: "H",
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      },
      (error, url) => {
        if (!error && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-hero-gradient pb-16 pt-16 md:pb-24"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_70%,rgba(15,23,42,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,173,100,0.15),transparent_55%)]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-[0.95fr_1.05fr] md:items-stretch md:px-6">
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
            Отслеживай новые объявления на Kufar первым
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            PATREBNA автоматически находит новые объявления и отправляет их
            прямо в Telegram. Настрой фильтры один раз и будь первым, кто
            увидит выгодное предложение.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2">
              Перейти в бот
              <ArrowUpRight size={18} />
            </Button>
            <Button size="lg" variant="secondary">
              Узнать больше
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
          <Card className="glass-card relative flex h-full min-h-[420px] flex-col justify-center overflow-hidden">
            <div className="absolute right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              QR вход
            </div>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="relative rounded-3xl bg-white p-5 shadow-soft">
                <div className="absolute -inset-4 -z-10 rounded-[32px] bg-gradient-to-br from-emerald-200/70 via-white to-sky-200/70 blur-2xl" />
                <canvas
                  ref={canvasRef}
                  className="h-[300px] w-[300px] rounded-2xl border border-slate-200 bg-white p-2"
                  aria-label="QR код для перехода в бот"
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
