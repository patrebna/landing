import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { reviews } from "@/data/reviews";

export default function ReviewsSection() {
  const perPage = 3;
  const totalPages = Math.ceil(reviews.length / perPage);
  const [page, setPage] = useState(0);

  const current = useMemo(() => {
    const start = page * perPage;
    return reviews.slice(start, start + perPage);
  }, [page]);

  const goPrev = () => {
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const goNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  return (
    <section id="reviews" className="bg-slate-50 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <h2 className="section-title">Отзывы пользователей</h2>
            <p className="section-subtitle">
              Люди уже нашли выгодные предложения с Patrebna.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-primary hover:text-brand-primary dark:border-slate-800 dark:text-slate-200"
              aria-label="Предыдущие отзывы"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-brand-primary hover:text-brand-primary dark:border-slate-800 dark:text-slate-200"
              aria-label="Следующие отзывы"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <motion.div
          key={page}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {current.map((review) => (
            <Card key={review.name} className="glass-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">{review.name}</div>
                  <div className="text-xs text-slate-500">{review.role}</div>
                </div>
                <div className="flex">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={14} className="text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                {review.comment}
              </p>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
