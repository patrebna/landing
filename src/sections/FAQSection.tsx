import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
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
      </div>
    </section>
  );
}
