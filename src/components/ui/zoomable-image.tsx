"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export function ZoomableImage({ src, alt, className, caption }: ZoomableImageProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <figure className="overflow-hidden rounded-lg border border-border bg-muted/30">
        <div className="flex h-48 w-full items-center justify-center bg-muted/50">
          <div className="text-center text-muted-foreground">
            <ZoomIn className="mx-auto mb-2 h-8 w-8 opacity-40" />
            <p className="text-sm font-medium">Image unavailable</p>
            <p className="mt-1 text-xs opacity-60">{alt}</p>
          </div>
        </div>
        {caption && (
          <figcaption className="px-3 py-2 text-xs text-muted-foreground text-center border-t border-border">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-muted/30">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-auto object-cover ${className || ""}`}
        onError={() => setImgError(true)}
      />
      {caption && (
        <figcaption className="px-3 py-2 text-xs text-muted-foreground text-center border-t border-border">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
