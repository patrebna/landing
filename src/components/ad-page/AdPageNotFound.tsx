import Header from "@/components/Header";
import Footer from "@/components/Footer";
import mascotUrl from "@/assets/mascot.webp";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AdPageNotFound() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-brand-dark dark:text-slate-100">
      <Header variant="compact" />
      <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center px-4 py-16 md:px-6">
        <Card className="glass-card w-full text-center">
          <div className="relative mx-auto w-fit">
            <div className="absolute left-1/2 top-[88%] h-6 w-36 -translate-x-1/2 rounded-full bg-slate-900/18 blur-lg dark:bg-black/55" />
            <div className="absolute left-1/2 top-[94%] h-3 w-24 -translate-x-1/2 rounded-full bg-emerald-900/10 blur-md dark:bg-emerald-400/12" />
            <img
              src={mascotUrl}
              alt="Маскот Patrebna"
              className="relative mx-auto h-44 w-auto drop-shadow-[0_18px_24px_rgba(15,23,42,0.18)] md:h-56 dark:drop-shadow-[0_18px_28px_rgba(0,0,0,0.45)]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold md:mt-6 md:text-4xl">
            Объявление не найдено
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-base text-slate-500 dark:text-slate-400 md:mt-3">
            Скорее всего, его удалили или профиль продавца неактивен.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => {
                window.location.href = "/";
              }}
            >
              На главную
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.history.length > 1
                  ? window.history.back()
                  : (window.location.href = "/");
              }}
            >
              Назад
            </Button>
          </div>
        </Card>
      </main>
      <Footer variant="compact" />
    </div>
  );
}

