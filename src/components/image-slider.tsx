/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/data/resume";

export function ImageSlider({ images }: { images: readonly ProjectImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const hasMany = images.length > 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((image, index) => (
              <div key={image.src} className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="max-h-[520px] w-auto max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        {hasMany && (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 shadow-sm hover:bg-background"
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 shadow-sm hover:bg-background"
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
          </>
        )}
      </div>
      {hasMany && (
        <div className="flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              aria-current={index === selected}
              className={cn(
                "h-2 rounded-full transition-all",
                index === selected ? "w-6 bg-foreground" : "w-2 bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      )}
      <p className="text-center text-xs text-muted-foreground">{images[selected]?.alt}</p>
    </div>
  );
}
