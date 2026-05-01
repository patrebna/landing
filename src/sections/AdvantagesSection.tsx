import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import lampUrl from "@/assets/images/lamp.webp";
import { advantageItems } from "@/data/advantages";
import { createElement } from "react";

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
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6">
        <div className="space-y-3">
          <h2 className="section-title">Преимущества сервиса</h2>
          <p className="section-subtitle">
            Patrebna помогает быть быстрее конкурентов и находить выгодные
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
          {advantageItems.map(({ title, description, icon }) => (
            <Card key={title} className="glass-card">
              <div className="flex items-center gap-3">
                <span className="flex min-h-12 min-w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  {createElement(icon, { size: 22 })}
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
