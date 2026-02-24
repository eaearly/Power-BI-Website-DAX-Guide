"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react";

interface ZoomableImageProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}

export function ZoomableImage({ src, alt, className, caption }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 5;
  const ZOOM_STEP = 0.15;

  const handleOpen = () => {
    setIsOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = () => setScale((p) => Math.min(p + ZOOM_STEP, MAX_SCALE));
  const handleZoomOut = () =>
    setScale((p) => {
      const n = Math.max(p - ZOOM_STEP, MIN_SCALE);
      if (n <= 1) setPosition({ x: 0, y: 0 });
      return n;
    });
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    setScale((p) => {
      const n = Math.max(MIN_SCALE, Math.min(p + delta, MAX_SCALE));
      if (n <= 1) setPosition({ x: 0, y: 0 });
      return n;
    });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!isOpen) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

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
    <>
      {/* Thumbnail */}
      <figure
        className="group relative mx-auto max-w-md overflow-hidden rounded-lg border border-border bg-muted/30 transition-[box-shadow,border-color] hover:shadow-lg hover:border-primary/30 cursor-pointer"
        onClick={handleOpen}
      >
        <div className="relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02] ${className || ""}`}
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-black/20 group-hover:opacity-100">
            <div className="rounded-full bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
              <ZoomIn className="h-5 w-5 text-zinc-800" />
            </div>
          </div>
        </div>
        {caption && (
          <figcaption className="px-3 py-2 text-xs text-muted-foreground text-center border-t border-border">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* ─── Fullscreen Lightbox ─── */}
      {isOpen && (
        <>
          {/* Backdrop — frosted glass, click to close */}
          <div
            onClick={handleClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99998,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Card — centered with explicit translate, NOT grid/flex */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 99999,
              maxWidth: "80vw",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onWheel={handleWheel}
          >
            {/* Toolbar — above the image card */}
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexShrink: 0 }}>
              <div className="flex items-center gap-1 rounded-full bg-white/10 dark:bg-white/10 px-2 py-1 backdrop-blur-md border border-white/20">
                <button onClick={handleZoomOut} disabled={scale <= MIN_SCALE} className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-30" title="Zoom out">
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-10 text-center text-xs font-mono text-white/90">{Math.round(scale * 100)}%</span>
                <button onClick={handleZoomIn} disabled={scale >= MAX_SCALE} className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:opacity-30" title="Zoom in">
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
                <div className="mx-0.5 h-3.5 w-px bg-white/20" />
                <button onClick={handleReset} className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white" title="Reset">
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              </div>
              <button onClick={handleClose} className="rounded-full bg-white/10 p-1.5 text-white/80 backdrop-blur-md border border-white/20 transition-colors hover:bg-red-500/60 hover:text-white" title="Close (Esc)">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Image container — card-style with white border */}
            <div
              className="overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-2xl border border-white/20"
              style={{
                maxWidth: "75vw",
                maxHeight: "70vh",
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "default",
              }}
              onMouseDown={handleMouseDown}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                draggable={false}
                style={{
                  display: "block",
                  maxWidth: "75vw",
                  maxHeight: "70vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  userSelect: "none",
                  transform:
                    scale === 1 && position.x === 0 && position.y === 0
                      ? "none"
                      : `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                  transition: isDragging ? "none" : "transform 0.2s ease-out",
                  transformOrigin: "center center",
                }}
              />
            </div>

            {/* Caption — below the image card */}
            {caption && (
              <p
                className="text-white/80 text-xs text-center mt-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10"
                style={{ maxWidth: "60vw", flexShrink: 0 }}
              >
                {caption}
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
}
