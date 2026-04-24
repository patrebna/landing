import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdGallery from "@/components/ad-page/AdGallery";
import AdPageNotFound from "@/components/ad-page/AdPageNotFound";
import AdPageSkeleton from "@/components/ad-page/AdPageSkeleton";
import AdSummaryCard from "@/components/ad-page/AdSummaryCard";
import RelatedAdsSection from "@/components/ad-page/RelatedAdsSection";
import SellerCard from "@/components/ad-page/SellerCard";
import { type IAd } from "@/data/ads";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { formatDate } from "@/lib/adPage";

function updateDocumentMeta(ad: IAd) {
  const normalizedDescription = (ad.description ?? "").replace(/\s+/g, " ").trim();
  const metaDescription =
    normalizedDescription || `${ad.title ?? "Объявление"} на PATREBNA.`;
  const pageTitle = `${ad.title ?? "Объявление"} | PATREBNA`;
  const shareImage = ad.images?.[0] || `${window.location.origin}/og-image.png`;

  document.title = pageTitle;

  const upsertMeta = (
    selector: string,
    attributeName: "content" | "href",
    value: string,
  ) => {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute(attributeName, value);
    }
  };

  upsertMeta('meta[name="description"]', "content", metaDescription);
  upsertMeta('meta[property="og:title"]', "content", pageTitle);
  upsertMeta('meta[property="og:description"]', "content", metaDescription);
  upsertMeta('meta[property="og:url"]', "content", window.location.href);
  upsertMeta('meta[property="og:image"]', "content", shareImage);
  upsertMeta('meta[name="twitter:title"]', "content", pageTitle);
  upsertMeta('meta[name="twitter:description"]', "content", metaDescription);
  upsertMeta('meta[name="twitter:image"]', "content", shareImage);
  upsertMeta('link[rel="canonical"]', "href", window.location.href);
}

export default function AdPage() {
  const { adId } = useParams<{ adId: string }>();
  const initialAdData = window.__AD_DATA__;

  const fetchData = async (): Promise<IAd> => {
    const { data } = await axios.get(`/api/ad/${adId}/details`);
    return data;
  };

  const { data: adData, isLoading } = useQuery({
    queryKey: ["ad", adId],
    queryFn: fetchData,
    enabled: Boolean(adId),
    staleTime: 60 * 60 * 1000,
    gcTime: 2 * 60 * 60 * 1000,
    initialData:
      initialAdData && initialAdData.id === adId ? initialAdData : undefined,
  });

  useEffect(() => {
    if (initialAdData && initialAdData.id === adId) {
      window.__AD_DATA__ = undefined;
    }
  }, [adId, initialAdData]);

  useEffect(() => {
    if (!adData) return;
    updateDocumentMeta(adData);
  }, [adData]);

  if (isLoading && !adData) {
    return <AdPageSkeleton />;
  }

  if (!adData) {
    return <AdPageNotFound />;
  }

  const seller = adData.seller;
  const ads = seller?.isCompany ? adData.partnerAds : adData.similarAds;
  const postedAtLabel = formatDate(new Date(adData.postedAt));

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-brand-dark dark:text-slate-100">
      <Header variant="compact" />
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <a href="/" className="transition hover:text-brand-primary">
            Главная
          </a>
          <ChevronRight size={14} />
          <span className="text-slate-400">Объявления</span>
          <ChevronRight size={14} />
          <span className="text-slate-700 dark:text-slate-200">
            {adData.category}
          </span>
        </nav>

        <div className="grid w-full gap-8 md:grid-cols-[2fr_1fr]">
          <section className="min-w-0 space-y-6">
            <AdGallery images={adData.images ?? []} title={adData.title} />

            <AdSummaryCard
              ad={adData}
              postedAtLabel={postedAtLabel}
              className="md:hidden"
              showButton={false}
            />

            <div className="md:hidden">
              <Button
                className="w-full"
                onClick={() => {
                  window.open(adData.kufarUrl, "_blank", "noopener,noreferrer");
                }}
              >
                Перейти на Kufar
              </Button>
            </div>

            <Card className="glass-card">
              <h2 className="text-lg font-semibold">Описание</h2>
              <p className="mt-3 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">
                {adData.description}
              </p>
            </Card>

            <Card className="glass-card">
              <h2 className="text-lg font-semibold">Характеристики</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(adData.characteristics ?? []).map(({ label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-slate-200/60 bg-white/70 px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <div className="text-xs uppercase text-slate-500">
                      {label}
                    </div>
                    <div className="mt-1 font-semibold">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <aside className="space-y-6">
            <AdSummaryCard
              ad={adData}
              postedAtLabel={postedAtLabel}
              className="hidden md:block"
            />
            <SellerCard seller={seller} />
          </aside>
        </div>

        <RelatedAdsSection
          ads={ads}
          isCompany={seller?.isCompany}
          formatDate={formatDate}
        />
      </main>
      <Footer variant="compact" />
    </div>
  );
}
