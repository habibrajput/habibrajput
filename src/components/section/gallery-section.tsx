/* eslint-disable @next/next/no-img-element */
import { MapPin } from "lucide-react";
import { DATA } from "@/data/resume";

export default function GallerySection({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <div className="flex min-h-0 flex-col gap-y-8">
      {showHeader && (
      <div className="flex flex-col gap-y-4 items-center justify-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">Gallery</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
          </div>
          <div className="flex flex-col gap-y-3 items-center justify-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Where I&apos;ve Lived &amp; Worked</h2>
            <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center">
              Moments from the cities that shaped my career.
            </p>
          </div>
        </div>
      )}
      {DATA.gallery.map((place) => (
        <div key={place.city} className="flex flex-col gap-3">
          <h3 className="flex items-center gap-1.5 font-semibold">
            <MapPin className="size-4 text-muted-foreground" aria-hidden />
            {place.city}, {place.country}
          </h3>
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
        </div>
      ))}
    </div>
  );
}
