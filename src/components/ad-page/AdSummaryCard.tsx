import { MapPin } from "lucide-react";
import { type IAd } from "@/data/ads";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type AdSummaryCardProps = {
  ad: IAd;
  postedAtLabel: string;
  className?: string;
  showButton?: boolean;
};

export default function AdSummaryCard({
  ad,
  postedAtLabel,
  className,
  showButton = true,
}: AdSummaryCardProps) {
  return (
    <Card className={`glass-card ${className ?? ""}`.trim()}>
      <div className="space-y-2">
        <div className="mt-2 text-3xl font-medium">
          {ad.price}
          {ad.price !== "Договорная" && ad.price !== "Бесплатно" ? (
            <span className="ml-1 text-2xl font-inter">ƃ</span>
          ) : null}
        </div>
        <h1 className="text-xl font-semibold">{ad.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} />
          {ad.location}
        </div>
        <p className="text-xs text-slate-500">{postedAtLabel}</p>
      </div>
      {showButton ? (
        <Button
          className="mt-4 w-full"
          onClick={() => {
            window.open(ad.kufarUrl, "_blank", "noopener,noreferrer");
          }}
        >
          Перейти на Kufar
        </Button>
      ) : null}
    </Card>
  );
}

