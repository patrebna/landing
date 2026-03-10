import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { reviews } from "@/data/reviews";

export default function ReviewsSection() {
  return (
    <section id="reviews" className="bg-slate-50 py-16 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="space-y-3">
          <h2 className="section-title">Отзывы пользователей</h2>
          <p className="section-subtitle">
            Люди уже нашли выгодные предложения с PATREBNA.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 grid gap-4 md:grid-cols-3"
        >
          {reviews.map((review) => (
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
