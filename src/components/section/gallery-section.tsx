/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Camera, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";

const placeLabel = (place: (typeof DATA.gallery)[number]) =>
  place.area ? `${place.city} · ${place.area}` : place.city;

export default function GallerySection({ showHeader = true }: { showHeader?: boolean }) {
  const [activeCity, setActiveCity] = useState(DATA.gallery[0]?.city);
  const place = DATA.gallery.find((p) => p.city === activeCity) ?? DATA.gallery[0];

  return (
    <div className="flex min-h-0 flex-col gap-y-6">
      {showHeader && (
        <div className="flex flex-col items-center gap-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Where I&apos;ve Lived &amp; Worked</h2>
          <p className="text-muted-foreground">Moments from the cities that shaped my career.</p>
        </div>
      )}

      <div role="tablist" aria-label="Cities" className="flex flex-wrap gap-2">
        {DATA.gallery.map((p) => {
          const selected = p.city === place.city;
          return (
            <button
              key={p.city}
              type="button"
              role="tab"
              id={`gallery-tab-${p.city}`}
              aria-selected={selected}
              aria-controls={`gallery-panel-${p.city}`}
              onClick={() => setActiveCity(p.city)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <MapPin className="size-3.5" aria-hidden />
              {placeLabel(p)}
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                  selected ? "bg-background/20" : "bg-muted",
                )}
              >
                {p.photos.length > 0 ? p.photos.length : "Soon"}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`gallery-panel-${place.city}`}
        aria-labelledby={`gallery-tab-${place.city}`}
        className="flex flex-col gap-3"
      >
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden />
          {placeLabel(place)}, {place.country}
        </p>

        {place.photos.length > 0 ? (
          <div className="columns-3 gap-2 sm:columns-4 lg:columns-6">
            {place.photos.map((photo) => (
              <a
                key={photo.src}
                href={photo.src}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 block break-inside-avoid overflow-hidden rounded-xl border border-border"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="h-auto w-full transition-transform duration-300 hover:scale-105"
                />
              </a>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <Camera className="size-5 text-muted-foreground" aria-hidden />
            </span>
            <p className="font-semibold">Photos coming soon</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Moments from {placeLabel(place)} are on their way.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
