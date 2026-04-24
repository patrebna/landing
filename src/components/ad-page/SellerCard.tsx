import { Star, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import LoadingImage from "./LoadingImage";

type Seller = {
  name: string;
  isCompany: boolean;
  avatar?: string;
  overallScore: number;
  receivedCount: number;
};

type SellerCardProps = {
  seller?: Seller;
};

export default function SellerCard({ seller }: SellerCardProps) {
  return (
    <Card className="glass-card">
      <h2 className="text-lg font-semibold">
        {seller?.isCompany ? "Компания" : "Продавец"}
      </h2>
      <div className="mt-3 flex items-center justify-between gap-4 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex min-h-16 min-w-16 items-center justify-center overflow-hidden rounded-lg bg-slate-200 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {seller?.avatar ? (
              <LoadingImage
                src={seller.avatar}
                alt={seller.name}
                className="max-h-16 max-w-16 object-cover"
                wrapperClassName="max-h-16 max-w-16"
              />
            ) : (
              <User className="h-9 w-9 text-gray-600" />
            )}
          </div>
          <div>
            <div className="text-base font-normal">
              {seller?.name ?? "Неизвестный продавец"}
            </div>
            {(seller?.receivedCount ?? 0) > 0 ? (
              <div className="text-xs text-slate-500">
                Оценок: {seller?.receivedCount}
              </div>
            ) : null}
          </div>
        </div>
        {(seller?.overallScore ?? 0) > 0 ? (
          <div className="flex items-center gap-1 text-md font-semibold">
            <Star className="text-amber-500" fill="currentColor" size={16} />
            {((seller?.overallScore ?? 0) * 5).toFixed(1)}
          </div>
        ) : null}
      </div>
    </Card>
  );
}

