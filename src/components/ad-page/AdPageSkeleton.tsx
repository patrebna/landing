import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function AdPageSkeleton() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-brand-dark dark:text-slate-100">
      <Header variant="compact" />
      <main className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-300 dark:text-slate-700">
          <div className="h-4 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="grid w-full gap-8 md:grid-cols-[2fr_1fr]">
          <section className="min-w-0 space-y-6">
            <Card className="glass-card overflow-hidden p-0">
              <div className="aspect-[4/4.9] w-full animate-pulse bg-slate-200 dark:bg-slate-800 md:h-[420px] md:aspect-auto" />
            </Card>

            <Card className="glass-card md:hidden">
              <div className="space-y-3">
                <div className="h-8 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="flex justify-between gap-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </Card>

            <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800 md:hidden" />

            <Card className="glass-card">
              <div className="h-6 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </Card>

            <Card className="glass-card">
              <div className="h-6 w-40 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200/60 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <div className="h-3 w-16 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="mt-2 h-4 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <aside className="hidden space-y-6 md:block">
            <Card className="glass-card">
              <div className="space-y-3">
                <div className="h-8 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="flex justify-between gap-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="mt-4 h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </Card>

            <Card className="glass-card">
              <div className="h-6 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-2">
                    <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                  </div>
                </div>
                <div className="h-4 w-10 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            </Card>
          </aside>
        </div>
      </main>
      <Footer variant="compact" />
    </div>
  );
}
