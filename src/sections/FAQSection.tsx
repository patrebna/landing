import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bot, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { faqItems } from "@/data/faq";
import bearUrl from "@/assets/images/bear.webp";

export default function FAQSection() {
  const botUrl = "https://t.me/patrebnaBot?start=source_site";

  return (
    <section id="faq" className="relative overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src={bearUrl}
          alt=""
          className="absolute bottom-12 hidden lg:block left-24 w-[400px] rotate-[16deg] drop-shadow-[0_9px_8px_rgba(0,0,0,0.3)] opacity-90 dark:opacity-75"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-6">
        <div className="space-y-3 text-center">
          <h2 className="section-title">Ответы на вопросы</h2>
          <p className="section-subtitle">
            Собрали ключевые ответы, чтобы старт был быстрым.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200/60 bg-white/80 px-6 py-4 shadow-soft dark:border-slate-800 dark:bg-slate-900/70">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <Card className="mt-8 relative overflow-hidden border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-white to-sky-50 dark:border-emerald-500/20 dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-900">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-400/10" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/60 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Sprout size={14} />
                Выбор за вами
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                Готовы попробовать Patrebna?
              </h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Больше не нужно проверять объявления вручную — всё приходит
                автоматически.
              </p>
            </div>

            <Button
              size="lg"
              className="gap-2 self-start md:self-center"
              onClick={() => {
                window.open(botUrl, "_blank", "noopener,noreferrer");
              }}
            >
              <Bot size={24} />
              Запустить бота
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
