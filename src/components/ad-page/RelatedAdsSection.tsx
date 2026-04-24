import { CalendarDays, ImageOff } from "lucide-react";
import { type ISimilarAd } from "@/data/ads";
import LoadingImage from "./LoadingImage";
import { getPriceText, showCurrency } from "@/lib/adPage";

type RelatedAdsSectionProps = {
  ads?: Array<ISimilarAd & { remunerationType?: string }>;
  isCompany?: boolean;
  formatDate: (date: Date) => string;
};

export default function RelatedAdsSection({
  ads,
  isCompany,
  formatDate,
}: RelatedAdsSectionProps) {
  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-xl font-semibold">
        {isCompany ? "Другие объявления продавца" : "Похожие объявления"}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {ads?.map(({ id, image, title, price, postedAt, remunerationType }) => (
          <a
            key={id}
            href={`/ad/${id}`}
            className="glass-card block overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl"
          >
            {image ? (
              <LoadingImage
                src={image}
                alt={title}
                className="aspect-square w-full object-cover"
                wrapperClassName="aspect-square w-full"
              />
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center bg-slate-50 text-slate-400 dark:bg-slate-900/70 dark:text-slate-500">
                <ImageOff size={30} />
                <span className="mt-2 text-xs font-medium">Нет фото</span>
              </div>
            )}
            <div className="space-y-2 p-4">
              <div className="text-xl font-medium">
                {getPriceText(price, remunerationType)}
                {showCurrency(price, remunerationType) ? (
                  <span className="ml-1 text-lg font-inter">ƃ</span>
                ) : null}
              </div>
              <div className="text-base font-semibold">{title}</div>
              <div className="flex items-center gap-1 text-sm text-slate-600">
                <CalendarDays size={16} />
                {formatDate(new Date(postedAt))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
