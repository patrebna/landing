import { useRef, useState } from "react";
import { ChevronRight, ImageOff } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation, Thumbs } from "swiper/modules";
import { Card } from "@/components/ui/card";
import LoadingImage from "./LoadingImage";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type AdGalleryProps = {
  images: string[];
  title: string;
};

export default function AdGallery({ images, title }: AdGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const thumbsRef = useRef<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const hasGallery = images.length > 1;

  return (
    <Card className="glass-card overflow-hidden">
      <div
        className={`grid gap-4 p-0 md:p-4 ${
          hasGallery ? "md:grid-cols-[96px_1fr]" : ""
        }`}
      >
        {hasGallery ? (
          <div className="hidden md:flex md:h-[430px] md:flex-col md:items-center md:justify-center md:gap-3">
            <button
              type="button"
              onClick={() => mainSwiper?.slidePrev()}
              className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition disabled:cursor-default disabled:opacity-45"
              aria-label="Предыдущие миниатюры"
              disabled={activeIndex === 0}
            >
              <ChevronRight className="-rotate-90" size={16} />
            </button>
            <Swiper
              direction="vertical"
              spaceBetween={3}
              slidesPerView={3.2}
              onSwiper={(swiper) => {
                thumbsRef.current = swiper;
                setThumbsSwiper(swiper);
              }}
              freeMode
              watchSlidesProgress
              slideToClickedSlide
              mousewheel
              grabCursor
              modules={[FreeMode, Thumbs, Mousewheel]}
              className="h-[340px] w-full"
            >
              {images.map((image, index) => (
                <SwiperSlide key={image}>
                  <button
                    type="button"
                    onClick={() => mainSwiper?.slideTo(index)}
                    className={`h-[104px] w-full overflow-hidden rounded-xl border-2 transition ${
                      index === activeIndex
                        ? "border-brand-primary"
                        : "border-transparent hover:opacity-70"
                    }`}
                  >
                    <LoadingImage
                      src={image}
                      alt="Миниатюра"
                      className="h-full w-full cursor-pointer object-cover"
                      wrapperClassName="h-full w-full rounded-xl"
                    />
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              type="button"
              onClick={() => mainSwiper?.slideNext()}
              className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow transition disabled:cursor-default disabled:opacity-45"
              aria-label="Следующие миниатюры"
              disabled={activeIndex >= images.length - 1}
            >
              <ChevronRight className="rotate-90" size={16} />
            </button>
          </div>
        ) : null}

        <div className="relative min-w-0">
          {hasGallery ? (
            <div className="absolute left-6 bottom-4 z-10 block rounded-lg bg-slate-800/65 px-3.5 py-1.5 text-xs font-semibold text-white md:hidden">
              {activeIndex + 1}/{images.length}
            </div>
          ) : null}

          {hasGallery ? (
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Navigation, Thumbs]}
              onSwiper={setMainSwiper}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="aspect-[4/4.9] w-full overflow-hidden md:h-[420px] md:aspect-auto"
            >
              {images.map((image) => (
                <SwiperSlide key={image}>
                  <div className="flex h-full w-full items-center justify-center overflow-hidden">
                    <LoadingImage
                      src={image}
                      alt={title}
                      className="block h-full w-max max-w-full rounded-2xl object-contain"
                      wrapperClassName="h-full w-full"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : images.length === 1 ? (
            <div className="flex aspect-[4/4.9] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-50 md:h-[420px] md:aspect-auto dark:bg-slate-800/20">
              <LoadingImage
                src={images[0]}
                alt={title}
                className="block h-full w-max max-w-full rounded-2xl object-contain"
                wrapperClassName="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/4.9] w-full flex-col items-center justify-center rounded-2xl border border-slate-200/70 bg-slate-50 px-6 text-center md:h-[420px] md:aspect-auto dark:border-slate-800 dark:bg-slate-800/20">
              <ImageOff
                size={42}
                className="mb-3 text-slate-400 dark:text-slate-500"
              />
              <p className="text-base font-medium text-slate-700 dark:text-slate-200">
                Фото отсутствует
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Продавец не добавил изображения к объявлению
              </p>
            </div>
          )}

          {hasGallery ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center gap-1.5 px-4 pb-4 md:hidden">
              {images.map((image, index) => (
                <span
                  key={image}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-6 bg-white/95"
                      : "w-1.5 bg-white/55"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
