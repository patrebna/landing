import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CalendarDays,
  ChevronRight,
  ImageOff,
  MapPin,
  Star,
  User,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { type IAd } from "@/data/ads";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function AdPage() {
  const { adId } = useParams<{ adId: string }>();

  const [adData, setData] = useState<IAd | undefined>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const thumbsRef = useRef<any>(null);
  const [mainSwiper, setMainSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const ads = adData?.seller.isCompany ? adData.partnerAds : adData?.similarAds;

  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/ad/${adId}/details`,
    );
    setData(data);
  };

  const formatDate = (d: Date) =>
    d.toDateString() === new Date().toDateString()
      ? `Сегодня, ${d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`
      : `${d.toLocaleDateString("ru-RU")}, ${d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`;

  useEffect(() => {
    fetchData();
    if (!adData) return;
    document.title = `${adData.title}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `${adData.title}. Цена ${adData.price} ${adData.category}. ${adData.location}.`,
      );
    }
  }, []);

  if (!adData) {
    return (
      <div className="min-h-screen bg-white text-slate-900 dark:bg-brand-dark dark:text-slate-100">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-16 md:px-6">
          <h1 className="text-2xl font-semibold">Объявление не найдено</h1>
          <p className="mt-2 text-slate-500">
            Проверьте ссылку или вернитесь на главную.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const images = adData?.images ?? [];
  const hasGallery = images.length > 1;
  const canScrollThumbs = images.length > 3;

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-brand-dark dark:text-slate-100">
      <Header />
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
            <Card className="glass-card overflow-hidden">
              <div
                className={`grid gap-4 p-0 md:p-4 ${
                  hasGallery ? "md:grid-cols-[96px_1fr]" : ""
                }`}
              >
                {hasGallery && (
                  <div className="hidden md:flex md:h-[420px] md:flex-col md:items-center md:justify-center md:gap-3">
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
                            <img
                              src={image}
                              alt="Миниатюра"
                              className="h-full w-full cursor-pointer object-cover"
                              loading="lazy"
                              decoding="async"
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
                )}

                <div className="relative min-w-0">
                  {hasGallery ? (
                    <div className="absolute md:hidden block left-6 bottom-4 z-10 rounded-lg bg-slate-800/65 px-3.5 py-1.5 text-xs font-semibold text-white md:left-4 md:top-4 md:px-3 md:py-1 md:text-xs">
                      {activeIndex + 1}/{images.length}
                    </div>
                  ) : null}
                  {hasGallery ? (
                    <Swiper
                      spaceBetween={10}
                      slidesPerView={1}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      modules={[Navigation, Thumbs]}
                      onSwiper={setMainSwiper}
                      onSlideChange={(swiper) =>
                        setActiveIndex(swiper.activeIndex)
                      }
                      className="aspect-[4/4.9] w-full overflow-hidden md:h-[420px] md:aspect-auto"
                    >
                      {images.map((image) => (
                        <SwiperSlide key={image}>
                          <div className="flex h-full w-full items-center justify-center overflow-hidden">
                            <img
                              src={image}
                              alt={adData.title}
                              className="block h-full w-max max-w-full rounded-2xl object-contain"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : images.length === 1 ? (
                    <div className="flex aspect-[4/4.9] w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-50 md:h-[420px] md:aspect-auto dark:bg-slate-800/20">
                      <img
                        src={images[0]}
                        alt={adData.title}
                        className="block h-full w-max max-w-full rounded-2xl object-contain"
                        loading="lazy"
                        decoding="async"
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

            <Card className="glass-card md:hidden">
              <div className="space-y-2">
                <div className="text-3xl mt-2 font-medium">
                  {adData.price}
                  {adData.price !== "Договорная" &&
                    adData.price !== "Бесплатно" && (
                      <span className="text-2xl ml-1 font-inter">ƃ</span>
                    )}
                </div>
                <h1 className="text-xl font-semibold">{adData.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />
                  {adData.location}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {formatDate(new Date(adData.postedAt))}
                </p>
              </div>
            </Card>

            <Button
              className="w-full md:hidden"
              onClick={() => {
                window.open(adData.kufarUrl, "_blank", "noopener,noreferrer");
              }}
            >
              Перейти на Kufar
            </Button>

            <Card className="glass-card">
              <h2 className="text-lg font-semibold">Описание</h2>
              <p className="mt-3 text-sm whitespace-pre-line text-slate-600 dark:text-slate-300">
                {adData.description}
              </p>
            </Card>

            <Card className="glass-card">
              <h2 className="text-lg font-semibold">Характеристики</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {adData.characteristics.map(({ label, value }) => (
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
            <Card className="glass-card hidden md:block">
              <div className="space-y-2">
                <div className="text-3xl mt-2 font-medium">
                  {adData.price}
                  {adData.price !== "Договорная" &&
                    adData.price !== "Бесплатно" && (
                      <span className="text-2xl ml-1 font-inter">ƃ</span>
                    )}
                </div>
                <h1 className="text-xl font-semibold">{adData.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />
                  {adData.location}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {formatDate(new Date(adData.postedAt))}
                </p>
              </div>
              <Button
                className="mt-4 w-full"
                onClick={() => {
                  window.open(adData.kufarUrl, "_blank", "noopener,noreferrer");
                }}
              >
                Перейти на Kufar
              </Button>
            </Card>

            <Card className="glass-card">
              <h2 className="text-lg font-semibold">
                {adData?.seller.isCompany ? "Компания" : "Продавец"}
              </h2>
              <div className="mt-3 flex items-center justify-between gap-4 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="flex min-h-16 min-w-16 items-center justify-center overflow-hidden rounded-lg bg-slate-200 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {adData.seller.avatar ? (
                      <img
                        src={adData.seller.avatar}
                        alt={adData.seller.name}
                        className="max-w-16 max-h-16 object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <User className="h-9 w-9 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-base font-normal">
                      {adData.seller.name}
                    </div>
                    {adData.seller.receivedCount > 0 && (
                      <div className="text-xs text-slate-500">
                        Оценок: {adData.seller.receivedCount}
                      </div>
                    )}
                  </div>
                </div>
                {adData.seller.overallScore > 0 && (
                  <div className="flex items-center gap-1  text-md font-semibold">
                    <Star
                      className="text-amber-500"
                      fill="currentColor"
                      size={16}
                    />
                    {(adData.seller.overallScore * 5).toFixed(1)}
                  </div>
                )}
              </div>
            </Card>
          </aside>
        </div>
        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-semibold">
            {adData?.seller.isCompany
              ? "Другие объявления продавца"
              : "Похожие объявления"}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {ads?.map(({ id, image, title, price, postedAt }) => (
              <a
                key={id}
                href={`/ad/${id}`}
                className="glass-card block overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={image}
                  alt={title}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="space-y-2 p-4">
                  <div className="text-xl font-medium">
                    {formatPrice(price.toString())}
                    {price !== "Договорная" && price !== "Бесплатно" && (
                      <span className="text-lg ml-1 font-inter">ƃ</span>
                    )}
                  </div>
                  <div className="text-base font-semibold">{title}</div>
                  <div className="text-sm flex justify-items-end  items-center gap-1 text-slate-600">
                    <CalendarDays size={16} />
                    {formatDate(new Date(postedAt))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const formatPrice = (value: string): string => {
  const num = +value / 100;
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: num < 1 ? 1 : 0,
    maximumFractionDigits: num < 1 ? 2 : 0,
  }).format(num);
};
