import { useState } from "react";

type LoadingImageProps = {
  src: string;
  alt: string;
  className: string;
  wrapperClassName?: string;
};

export default function LoadingImage({
  src,
  alt,
  className,
  wrapperClassName = "",
}: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center ${wrapperClassName}`}
    >
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-inherit bg-slate-100/80 dark:bg-slate-900/80">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-emerald-500 dark:border-slate-700 dark:border-t-emerald-400" />
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}

